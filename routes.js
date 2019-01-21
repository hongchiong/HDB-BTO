module.exports = (app, db) => {
    const bto = require('./controllers/bto')(db);

    app.get('/', bto.index);
    app.get('/:blknum', bto.blk);
    app.post('/users', bto.sign);
};