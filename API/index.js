const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

var corsOptions = {
    origin: 'https://codepen.io'
}

app.use(bodyParser.json());
app.use(cors(corsOptions)); 

//Import Routes
const postRoute = require('./routes/posts');

//Middleware
app.use('/posts', postRoute);

//Routes
app.get('/',(req,res) => {
    res.send("Home");
});

//Connect to DB   
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => { console.log('Connected to DB');
});

//Listen
app.listen(process.env.PORT || 3000);