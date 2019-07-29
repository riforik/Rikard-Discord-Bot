var mysql = require('mysql');

var knexPool = require('knex')({
  client: 'mysql',
  connection: {
    host: 'host address',
    user: 'username',
    password: 'password',
    database: 'database',
    port: 3306,
    pool: {
      afterCreate: function(conn, done) {
        // in this example we use pg driver's connection API
        conn.query('SET timezone="GMT-4";', function(err) {
          if (err) {
            // first query failed, return error and don't try to make next query
            done(err, conn);
          } else {
            // do the second query...
            conn.query('SELECT set_limit(0.01);', function(err) {
              // if err is not falsy, connection is discarded from pool
              // if connection aquire was triggered by a query the error is passed to query promise
              done(err, conn);
            });
          }
        })
      }
    }
  }
});
module.exports = knexPool;
