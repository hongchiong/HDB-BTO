module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const index = (req, res) => {
      db.bto.getAll((err, result) => {
        res.render('home', [result]);
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
