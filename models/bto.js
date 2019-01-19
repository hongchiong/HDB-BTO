const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
    let getAll = (callback) => {
        let query = "SELECT * FROM units";
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
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


                //Array of Blks and their Levels
                let blkAndLevels = [];
                for ( i in blksArr ) {
                    let tempLvlArr = [];
                    let blklvlquery = `SELECT level, blknum FROM units WHERE units.blknum = '${blksArr[i]}';`;
                    dbPoolInstance.query(blklvlquery, (err,result) => {
                        for ( i in result.rows ) {
                            tempLvlArr.push(result.rows[i].level);
                        };
                        tempLvlArr = rmDups(tempLvlArr).sort();
                        blkAndLevels[result.rows[i].blknum] = tempLvlArr;
                    });
                    console.log(blkAndLevels);
                };








                let returnResult = {
                    allBlkNums: blksArr,
                    allLevels: levelsArr,
                    allUnitNums: unitsArr,
                    allUnits: result.rows
                };
                //result.row is an array of result elements
                callback(err, returnResult);
            };
        });
    };

    return {
        getAll,
    };
};