module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const index = (req, res) => {
      db.bto.getAll((err, result) => {
        res.send(result);
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
