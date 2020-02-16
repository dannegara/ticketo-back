const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

//Put these in the env file

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(err => {
    if(err) throw err;
    console.log('connected');
    connection.query('select * from countries', (err, result) => {
        //if(err) throw err;
        console.log(result);
    });
})

//Routes
const authRoute = require('./routes/auth');


const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
//   })

app.get('/', (req, res) => {
    res.json({msg: 'Something'});
});

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log("Listen on port " + PORT);
});