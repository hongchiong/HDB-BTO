const pg = require('pg');
// const tweets = require('./models/tweets');

const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'fintrack',
  port: 5432,
  password: 'pg'
};
const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {

    pool: pool
};