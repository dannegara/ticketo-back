const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const authRoute = require('./routes/auth');
const countriesRoute = require('./routes/countries');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
//   });

app.use('/api/auth', authRoute);

app.use('/api/countries', countriesRoute);

app.listen(PORT, () => {
    console.log("Listen on port " + PORT);
});