module.exports = (db) => {
//FUNCTION TO REMOVE DUPLICATES FROM ARRAY
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
const index = (req, res) => {
    db.bto.index((err, result) => {
        // console.log(result['unitsForUnitnum']);
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
  };
}
