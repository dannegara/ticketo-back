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

//the heroku db server automatically disconnects
//after several seconds of inactivity
//so here's a good way to prevent it :D

setInterval(() => {
    connection.query('select 1');
}, 5000);

errHandlingDbQuery = (query, params, cb) => {
    connection.query(query, params, (err, result) => {
        if(err) throw new Error(err);
        cb && cb(result);
    });
}
const call = (procedureName, params) => {
    return new Promise((resolve, reject) => {
        const questionMarks = new Array(params.length).fill('?').join(',');
        connection.query(`call ${procedureName}(${questionMarks})`, params, (err, res) => {
            if(err) throw new Error(err);
            resolve(res);
        });
    });
}

module.exports={
    call,
    db: connection,
    errHandlingDbQuery
}