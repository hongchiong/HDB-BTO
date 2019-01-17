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
    const startQueries = (seeded, allUnits, allBlks) => {
        const queryBlock = (blkQuery, allUnits, allBlks) => {
            for (let j = 0; j < allBlks.length; j++) {
                blkValue = [allBlks[j]];
                db.pool.query(blkQuery, blkValue, (err, result) => {
                    if (err) {
                        console.error('query error:', err.stack);
                    } else {
                        //Seed Units
                        console.log(result.rows[0]);
                        for (let k = 0; k < allUnits.length - 1; k++) {
                            if (allUnits[k].blkName == result.rows[0].blk_num) {
                                if (allUnits[k].unitColor == '#cc0000') {
                                    let unitQuery = `INSERT INTO units (unit_num, blk_id, selected) VALUES ('${allUnits[k].unitNumber}', '${result.rows[0].id}', '${true}');`;
                                    db.pool.query(unitQuery, (err, result) => {
                                        if (err) {
                                            console.error('query error', err.stack);
                                        }
                                    });
                                } else {
                                    let unitQuery = `INSERT INTO units (unit_num, blk_id, selected) VALUES ('${allUnits[k].unitNumber}', '${result.rows[0].id}', '${false}');`;
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

        //check which query to use
        if (seeded) {
            let blkQuery = `SELECT blks.id, blks.blk_num FROM blks;`;
            queryBlock(blkQuery, allUnits, allBlks);
        } else {
            let blkQuery = `INSERT INTO blks (blk_num) VALUES ($1) RETURNING id, blk_num;`;
            queryBlock(blkQuery, allUnits, allBlks);
        }
    };

    const allBlks = allUnits[allUnits.length - 1];
    //Need to make a check for whether Blks seeded already
    let seeded = false;
    for (let i = 0; i < allBlks.length; i++) {
        let blkQuery = `SELECT blk_num FROM blks;`
        db.pool.query(blkQuery, (err, result) => {
            if (result.rows[0] == undefined) {
                seeded = false;
            } else if (allBlks[i] == result.rows[0].blk_num) {
                seeded = true;
            };
        });
    };
    startQueries(seeded, allUnits, allBlks);
};


//To Check How Much Time Passed Since Last Update
let query = "SELECT data_on FROM units ORDER BY id DESC";
let latestUpdate;
db.pool.query(query, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
    } else {
        //if 3 hrs has passed since latest update
        let now = new Date();
        if (result.rows[0] == undefined || (now.getTime() - result.rows[0].data_on.getTime()) > 10800000) {
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
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
let onClose = function(){
  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};
process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);