const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
    let getAll = (callback) => {
        let query = "SELECT * FROM units INNER JOIN blks ON (units.blk_id = blks.id);";
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
                console.log("THIS IS QUERY RESULT");
                console.log(result);
                callback(err, result.rows);
            };
        });
    };

    return {
        getAll,
    };
};