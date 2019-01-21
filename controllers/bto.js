module.exports = (db) => {
//FUNCTION TO REMOVE DUPLICATES FROM ARRAY
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
const index = (req, res) => {
    db.bto.blk(req.cookies['loggedIn'], req.cookies['name'],'431B', (err, result) => {
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

const sign = (req, res) => {
    db.bto.sign( req.body, (err, result, func, nameCookie) => {
        switch (func) {
            case 'signout':
                res.clearCookie('loggedIn');
                res.clearCookie('name');
                res.redirect('/');
                break;

            case 'signin':
                res.cookie('loggedIn', true);
                res.cookie('name', nameCookie);
                res.redirect('/');
                break;

            default:
                res.redirect('/');
        }
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
    sign,
  };
}
