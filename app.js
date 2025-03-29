var express = require('express');

var app = express();
var session = require('express-session');
var conn = require('./dbConfig');
const notifier = require('node-notifier');
const multer = require('multer');
const upload= multer();

var bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPass(password){
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}

app.set('view engine', 'ejs');

app.use(session({
    //security stuff - secret is the session key and should be secure. Read more about it. 
    secret: 'bananabreak',
    resave: false,
    saveUninitialized: true
}));

app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function isAuthenticated(req,res,next){
    if(req.session && req.session.loggedin){
        return next();
    }
    res.status(403).json({message:'Not logged in!'})
}



/* app.get('/boardview', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('boardview');
    }
    else {
        res.send('Please login to view this page!');
    }
}); */

app.get('/', function (req, res) {
    res.render("home");
});

app.get('/register', function (req, res) {
    res.render("register");
});


app.get('/boardview', isAuthenticated, function (req, res) {
    if(req.session.loggedin = true)
    res.render("boardview");
    else {
        res.send('Please login to view this page!');
    }
}); 

app.get('/jobloading', isAuthenticated, function(req,res) {
    res.render("jobloading");
})


app.get('/logout', (req, res) => {
    
    req.session.destroy(err=>{
        if (err) {
            return res.status(500).json({ message: 'Error logging out.' });
        }
    });
    
    res.redirect('/');
});

app.get('/asmjob', isAuthenticated, (req,res)=>{
    conn.query('SELECT * FROM asmjob WHERE NOT complete = 1', (err,results)=>{
        if(err)  throw err;
        res.json(results);
        
    });
});

app.get('/completejobs',isAuthenticated,(req,res)=>{
    conn.query('SELECT * FROM asmjob WHERE complete = 1', (err, results) =>{
        if(err) throw err;
        res.json(results);
    });
})

app.post('/auth', function (req, res) {
    let name = req.body.username;
    var password = req.body.password;
    
    if (name && password) {
        
        /* conn.query('SELECT * FROM users WHERE user = ? AND password = ?', [name, password],
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
        ); */
        conn.query('SELECT password FROM users WHERE user = ?',[name],
            function (error, results, fields) {

                if (error) throw error;
                if (results.length > 0) {
                    password = bcrypt.hashSync(req.body.password,10)
                    const passwordMatch = bcrypt.compareSync(req.body.password, password);
                    if(passwordMatch){
                    req.session.loggedin = true;
                    req.session.username = name;
                    res.redirect('/boardview');
                    }
                }
                else {
                    res.send('Incorrect Username or password');
                }
                res.end();
            }
        )
    }
    else {
        res.send('Please enter username and password');
        res.end();
    }
});


app.post('/reg', function (req, res) {
    let name = req.body.username;
    let password = req.body.password;
    let passwordver = req.body.passwordver;
    let uniqueID = true;
    
    var hashpw = bcrypt.hashSync(req.body.password,10);
    var sql = `INSERT INTO users (user, password) VALUES ("${name}", "${hashpw}")`;
    if (name) {
        conn.query('SELECT user FROM users WHERE user = ?', [name],
            function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    notifier.notify('Username already in use!');
                    res.render('register');
                    uniqueID = null;
                }
            });
        
    }
    if (name && (password == passwordver) && uniqueID) {

        conn.query(sql, function (error, results) {
            if (error) throw error;

            notifier.notify('Thank you for registering!');

            res.render("home");
        });


    }
    else {notifier.notify("Passwords don't match!")}

}
);

app.post('/submit', upload.none(), (req, res) => {
    
    const { assemblyOrder, shipDate, partNumber, quantity, assemblyTime } = req.body;

    if (!assemblyOrder || !shipDate || !partNumber || !quantity || !assemblyTime) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    const sql = `INSERT INTO asmjob (ao, partnum, shipdate, qty, asmtime)
                 VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE partnum=VALUES(partnum), shipdate = VALUES(shipdate), qty=VALUES(qty), asmtime = VALUES(asmtime)`;

    conn.query(sql, [assemblyOrder, partNumber, shipDate, quantity, assemblyTime], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Form submitted successfully' });
    });
});

app.post('/send-jobs',(req,res)=>{
    const jobs = req.body.jobs;

    if(!jobs||jobs.length==0) {
        return res.status(400).json({message:'No Jobs Submitted'});
    }

    //const placeholders = jobs.map(()=>'?').join(',');
    console.log("Debugging");
    jobs.forEach((job) => {
        const sql = `UPDATE asmjob SET complete = 1 WHERE AO = ${job}`;

        conn.query(sql,(err,result)=>{
            if(err){
                return conn.rollback(()=>{
                    res.status(500).json({message:"Error Inserting Data @" + job});
                })
            }
        })
    });
    
    
})


app.listen(3000);
console.log('Node app is running on port 3000');
