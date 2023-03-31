// Requirements
const express = require('express');
const bodyParser = require('body-parser')
    , path = require('path')
    , mongoose = require('mongoose')
    , fs = require('fs')
    , http = require('http');

// Initiate express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// Setting the view engine and path
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Simple get API
app.get('/', (req,res)=>{
    res.writeHead(200,{'Content-type':'text/html'});
    res.write('Hello');
    res.end();
});

// Listen method
const port = 3000
app.listen(port, function(){(console.log(`Example app listening at http://localhost:${port}`))});