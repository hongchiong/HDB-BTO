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
/**
 * ===================================
 * Routes
 * ===================================
 */
//==============================================================

const seedDatabase = (allUnits) => {
    //Seed Blks
    let allBlks = [];
    for (let i = 0; i < allUnits.length; i++) {
        if (!allBlks.includes(allUnits[i].blkName)) {
            allBlks.push(allUnits[i].blkName);
        };
    };
    console.log(allBlks);

    //Need to make a check for whether Blks seeded already

    for (let i = 0; i < allBlks.length; i++) {
        let blkQuery = `INSERT INTO blks (blk_num) VALUES ('${allBlks[i]}') RETURNING id, blk_num;`;
        db.pool.query(blkQuery, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
            } else {
                //Seed Units
                console.log(result.rows[0]);
                for (let j = 0; j < allUnits.length; j++) {
                    if (allUnits[j].blkName == result.rows[0].blk_num) {
                        if (allUnits[j].unitColor == '#cc0000') {
                            let unitQuery = `INSERT INTO units (unit_num, blk_id, selected) VALUES ('${allUnits[j].unitNumber}', '${result.rows[0].id}', '${true}');`;
                            db.pool.query(unitQuery, (err, result) => {
                                if (err) {
                                    console.error('query error', err.stack);
                                }
                            });
                        } else {
                            let unitQuery = `INSERT INTO units (unit_num, blk_id, selected) VALUES ('${allUnits[j].unitNumber}', '${result.rows[0].id}', '${false}');`;
                            db.pool.query(unitQuery, (err, result) => {
                                if (err) {
                                    console.error('query error', err.stack);
                                }
                            });
                        }
                    };

                };
            }
        });
    };
};

//To Check How Much Time Passed Since Last Update
let query = "SELECT data_on FROM units ORDER BY id DESC";
let latestUpdate;
db.pool.query(query, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
    } else {
        //if 1 hr has passed since latest update
        let now = new Date();
        if (result.rows[0] == undefined || (now.getTime() - result.rows[0].data_on.getTime()) > 3600000) {
            const starter = scraper.scrape.then(allUnits => {

                console.log(allUnits)
                console.log(allUnits.length);
                seedDatabase(allUnits);
                require('./routes')(app, db);

            });
        } else {
            require('./routes')(app, db);
        }
    };
});



//==============================================================
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
let onClose = function(){
  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};
process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);