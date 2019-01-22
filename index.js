const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const db = require('./db');
const scraper = require('./puppet');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

const startScrape = () => {
    scraper.scrape(true).then(allUnits => {
        console.log(allUnits)
        console.log(allUnits.length);
        seedDatabase(allUnits);
        require('./routes')(app, db);
    });
};

const seedDatabase = (allUnits) => {
    //CHECK IF SEEDED
    let seedQuery = `SELECT COUNT (unit) FROM units;`;
    db.pool.query(seedQuery, (err, result) => {
        if (err) {
          console.error('query error:', err.stack);
        } else {
            if (result.rows[0].count == 645) {
                //SEEDED PREVIOUSLY
                for ( i in allUnits ) {
                    if (allUnits[i].unitColor == '#cc0000') {
                        let updateQuery = `UPDATE units SET selected = 't', updated_on = 'now()' WHERE unit = '${allUnits[i].unit}';`;
                        db.pool.query(updateQuery, (err, result) => {
                            if (err) {
                                console.error('query error:', err.stack);
                            };
                        });
                    } else {
                        let updateQuery = `UPDATE units SET selected = 'f', updated_on = 'now()' WHERE unit = '${allUnits[i].unit}';`;
                        db.pool.query(updateQuery, (err, result) => {
                            if (err) {
                                console.error('query error:', err.stack);
                            };
                        });
                    };
                };
            } else {
                //NOT SEEDED
                for ( i in allUnits ) {
                    let insertQuery = `INSERT INTO units (unit, selected, blknum, level, unitnum) VALUES ($1, $2, $3, $4, $5);`;
                    if (allUnits[i].unitColor == '#cc0000') {
                        let unitsValues = [allUnits[i].unit, true, allUnits[i].blkNum, allUnits[i].lvl, allUnits[i].unitNumber];
                        db.pool.query(insertQuery, unitsValues, (err, result) => {
                            if (err) {
                                console.error('query error:', err.stack);
                            };
                        });
                    } else {
                        let unitsValues = [allUnits[i].unit, false, allUnits[i].blkNum, allUnits[i].lvl, allUnits[i].unitNumber];
                        db.pool.query(insertQuery, unitsValues, (err, result) => {
                            if (err) {
                                console.error('query error:', err.stack);
                            };
                        });
                    };
                };
            };
        };
    });
};


// To Check How Much Time Passed Since Last Update
let query = "SELECT updated_on FROM units ORDER BY updated_on ASC";
db.pool.query(query, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
    } else {
        //if 3 hrs has passed since latest update
        let now = new Date();
        if (result.rows[0] == undefined || (now.getTime() - result.rows[0].updated_on.getTime()) > 10800000) {
            //Scrape and then scrape every hr
            startScrape();
            setInterval(startScrape, 3600000);
        } else {
            require('./routes')(app, db);
            //Scrape every hr
            setInterval(startScrape, 3600000);
        }
    };
});
//==============================================================
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port ' + PORT + ' ~~~'));
let onClose = function(){
  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};
process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);