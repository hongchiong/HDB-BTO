const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);
const async = require("async");
// import eachOf from 'async/eachOf';



module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
    let getAllData = () => {
        let query = "SELECT * FROM units";
        let returnResult = {};
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
                let allUnits = result.rows;
                //Find out all level numbers
                let levelsArr = [];
                for ( i in result.rows ) {
                    levelsArr.push(result.rows[i].level);
                }
                levelsArr = rmDups(levelsArr).sort();

                //Find out all blk numbers
                let blksArr = [];
                for ( i in result.rows ) {
                    blksArr.push(result.rows[i].blknum);
                }
                blksArr = rmDups(blksArr).sort();

                //Find out all unit numbers
                let unitsArr = [];
                for ( i in result.rows ) {
                    unitsArr.push(result.rows[i].unitnum);
                }
                unitsArr = rmDups(unitsArr).sort();

                returnResult['allBlkNums'] = blksArr
                returnResult['allLevels'] = levelsArr
                returnResult['allUnitNums'] = unitsArr
                returnResult['allUnits'] = allUnits
            };
        });
    };




    let index = async (callback) => {

        let query = "SELECT * FROM units";
        let returnResult = {};
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
                let allUnits = result.rows;
                //Find out all level numbers
                let levelsArr = [];
                for ( i in result.rows ) {
                    levelsArr.push(result.rows[i].level);
                }
                levelsArr = rmDups(levelsArr).sort();

                //Find out all blk numbers
                let blksArr = [];
                for ( i in result.rows ) {
                    blksArr.push(result.rows[i].blknum);
                }
                blksArr = rmDups(blksArr).sort();

                //Find out all unit numbers
                let unitsArr = [];
                for ( i in result.rows ) {
                    unitsArr.push(result.rows[i].unitnum);
                }
                unitsArr = rmDups(unitsArr).sort();

                returnResult['allBlkNums'] = blksArr
                returnResult['allLevels'] = levelsArr
                returnResult['allUnitNums'] = unitsArr
                returnResult['allUnits'] = allUnits

                let unitsForUnitnum = [];
                async.forEachOf(unitsArr, (dataEle, i, inner_callback) => {
                    let unitsQuery = `SELECT * FROM units WHERE unitnum = '${dataEle}' ORDER BY level DESC;`
                    dbPoolInstance.query(unitsQuery, (err, result) => {
                        if (err) {
                            console.error('query error', err.stack);
                            inner_callback(null);
                        } else {
                            let dataobj = {};
                            dataobj[dataEle] = result.rows;
                            unitsForUnitnum.push(dataobj);
                            inner_callback(null);
                        }
                    });
                }, (err) => {
                    returnResult['unitsForUnitnum'] = (unitsForUnitnum);
                    // callback(null, returnResult);
                });

                let unitsForLevel = [];
                async.forEachOf(levelsArr, (dataEle, i, inner_callback) => {
                    let levelsQuery = `SELECT * FROM units WHERE level = '${dataEle}' ORDER BY unitnum ASC;`
                    dbPoolInstance.query(levelsQuery, (err, result) => {
                        if (err) {
                            console.error('query error', err.stack);
                            inner_callback(null);
                        } else {
                            let dataobj = {};
                            dataobj[dataEle] = result.rows;
                            unitsForLevel.push(dataobj);
                            inner_callback(null);
                        }
                    });
                }, (err) => {
                    returnResult['unitsForLevel'] = (unitsForLevel);
                    callback(null, returnResult);
                });
            };
        });
    }




    return {
        index,
    };
};