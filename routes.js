module.exports = (app, db) => {
    const bto = require('./controllers/bto')(db);

    app.get('/', bto.index);
};