module.exports = (db) => {
//FUNCTION TO REMOVE DUPLICATES FROM ARRAY
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
const index = (req, res) => {
    db.bto.getAll((err, result) => {
        //Format result into array of objects for home jsx
        //Array of all Blks Number
        let blksArr = result.map(blk => blk.blk_num);
        blksArr = rmDups(blksArr).sort();
        //Array of all Units Number
        let unitsArr = result.map(units => units.unit_num.substr(4));
        unitsArr = rmDups(unitsArr).sort();
        //Array of all Lvls
        let lvlsArr = result.map(lvls => lvls.unit_num.substr(1,2));
        lvlsArr = rmDups(lvlsArr).sort();

        //Create Object With (Blk AS Keys), (Array of Unit Objects AS Value) Pairs
        let resultArr = [];
        let mppr = blksArr.map( blk => {
            let temp = {};
            temp[blk] = result.filter( obj => {
                if (obj.blk_num == blk) {
                    return obj;
                }
            })
            resultArr.push(temp)
        });

        res.render('home', {homes: resultArr});
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
