const mysqlConnection = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '1',
        database: 'blog'
    }
});

module.exports = mysqlConnection;