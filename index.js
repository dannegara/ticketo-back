const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const authRoute = require('./routes/auth');
const countriesRoute = require('./routes/countries');
const ticketRoute = require('./routes/ticket');
const eventsRoute = require('./routes/events');

//MiddleWares
const { decodeToken } = require('./middleware/chechToken');

//Main

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(decodeToken);

app.use('/api/auth', authRoute);
app.use('/api/countries', countriesRoute);
app.use('/api/ticket', ticketRoute);
app.use('/api/events', eventsRoute);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(err);
})

app.use((_, res) => {
    res.status(404).json({ err: 'invalid route' });
});

app.listen(PORT, () => {
    console.log("Listen on port " + PORT);
});