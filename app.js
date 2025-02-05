var express = require('express');
var app = express();
var session = require('express-session');
var conn = require('./dbConfig');
const notifier = require('node-notifier');

app.set('view engine', 'ejs');

app.use(session({
    //security stuff - secret is the session key and should be secure. Read more about it. 
    secret: 'bananabreak',
    resave: true,
    saveUninitialized: true
}));

app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/boardview', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('boardview');
    }
    else {
        res.send('Please login to view this page!');
    }
});

app.get('/', function (req, res) {
    res.render("home");
});
app.get('/auckland', function (req, res) {
    res.render("auckland");
});

app.get('/beaches', function (req, res) {
    res.render("beaches");
});

app.get('/boardview', function (req, res) {
    res.render("boardview");
});

app.get('/register', function (req, res) {
    res.render("register");
});

app.get('/login', function (req, res) {
    res.render('login.ejs');
});

app.get('/datatest',function(req,res){
    res.render('datatest.ejs');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/home');
});

app.get('/asmjob',(req,res)=>{
    conn.query('SELECT * FROM asmjob', (err,results)=>{
        if(err)  throw err;
        res.json(results);
        console.log(results);
    });
});


app.post('/auth', function (req, res) {
    let name = req.body.username;
    let password = req.body.password;
    if (name && password) {
        conn.query('SELECT * FROM users WHERE user = ? AND password = ?', [name, password],
            function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = name;
                    res.redirect('/boardview');
                }
                else {
                    res.send('Incorrect Username or password');
                }
                res.end();
            }
        );
    }
    else {
        res.send('Please enter username and password');
        res.end();
    }
});


app.post('/reg', function (req, res) {
    let name = req.body.username;
    let password = req.body.password;
    var sql = `INSERT INTO users (user, password) VALUES ("${name}", "${password}")`;
    if (name) {
        conn.query('SELECT user FROM users WHERE user = ?', [name],
            function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    notifier.notify('Username already in use!');
                    res.render('register');
                }
            });
    }
     if (name && password) {

        conn.query(sql, function (error, results) {
            if (error) throw error;

            res.send('Thank you for registering!');

            res.end();
        });


    }

}
);



app.listen(3000);
console.log('Node app is running on port 3000');
