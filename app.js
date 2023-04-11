// Requirements
const express = require('express');
const bodyParser = require('body-parser')
    , path = require('path')
    , mongoose = require('mongoose')
    , fs = require('fs')
    , http = require('http');

// Initiate express
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Setting the view engine and path
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

require('./models/user');
require('./models/subject');

mongoose.connect('mongodb://127.0.0.1:27017/DMLCollege',{useUnifiedTopology:true}, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log("We are connected on mongoose!");
});

// Routing with GET API
app.get('/',(req,res)=>{
    res.render(__dirname+'/views/home.ejs');
});

app.get('/views/register',(req,res)=>{
    res.render(__dirname+'/views/register.ejs');
});

app.get('/login',(req,res)=>{
    res.render(__dirname+'/views/login.ejs');
});

app.get('/studentdetails',(req,res)=>{
    res.render(__dirname+'/views/studentdetails.ejs');
});




const appcontroller = require('./controllers/appcontroller.js');
app.post('/user/register', appcontroller.RegisterUser);
app.post('/user/login', appcontroller.LoginUser)

// Listen method
const port = 3000
app.listen(port, function(){(console.log(`Example app listening at http://localhost:${port}`))});