const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./config/database');


db.query('call GetEvents(?)', [null], (err, result) => {
    //if(err) throw err;
    console.log(result[0]);
});

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