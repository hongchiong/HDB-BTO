const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
    let getAll = (callback) => {
        let query = "SELECT units.id, units.unit_num, units.selected, units.data_on, blks.blk_num  FROM units INNER JOIN blks ON (blks.id = units.blk_id) ORDER BY units.id DESC LIMIT 645;";
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
                // console.log(result.rows);
                callback(err, result.rows);
            };
        });
    };

    return {
        getAll,
    };
};