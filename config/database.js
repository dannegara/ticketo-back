const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(err => {
    if(err) throw err;
});

errHandlingDbQuery = (query, params, cb) => {
    connection.query(query, params, (err, result) => {
        if(err) throw new Error(err);
        cb && cb(result);
    });
}

module.exports={
    db: connection,
    errHandlingDbQuery,
}