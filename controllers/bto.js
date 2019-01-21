module.exports = (db) => {
//FUNCTION TO REMOVE DUPLICATES FROM ARRAY
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
const index = (req, res) => {
    db.bto.blk('431B', (err, result) => {
        // console.log(result['unitsForUnitnum']);
        res.render('home', {btoData: result});
    });
};

const blk = (req, res) => {
    db.bto.blk(req.params.blknum, (err, result) => {
        // console.log(result);
        res.render('home', {btoData: result});
    });
};

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index,
    blk,
  };
}
