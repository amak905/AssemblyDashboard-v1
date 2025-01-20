var express = require('express');
var app = express();
var session = require('express-session');
var conn = require('./dbConfig');
app.set('view engine', 'ejs');

app.use(session({
    //security stuff - secret is the session key and should be secure. Read more about it. 
    secret:'bananabreak',
    resave: true,
    saveUninitialized: true
}));

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.render("home");
});
app.get('/auckland',function(req,res){
    res.render("auckland");
});

app.get('/beaches',function(req,res){
    res.render("beaches");
});

app.get('/boardview',function(req,res){
    res.render("boardview");
});

app.listen(3000);
console.log('Node app is running on port 3000');
