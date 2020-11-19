const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const empRoute = require('./routes/employees');
const cors = require('cors');
require('dotenv/config');

/*###############Middleware###################*/
app.use(cors());
app.use(bodyParser.json());
app.use('/emp', empRoute);

/*################Routes######################*/
app.get('/',(req, res) => {
    res.send('Home');
});

/*Connect to DB */
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to DB');
});

/*###############Listener######################*/
app.listen(process.env.PORT || 3000);