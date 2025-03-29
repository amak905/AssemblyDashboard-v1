var mysql = require('mysql2');
var conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'kanban_board'
});

conn.connect(function(err){
    if(err) throw err;
    console.log('Database Connected');
});

/* conn.query('SELECT * FROM asmjob',(err,rows,fields)=>{
    if (err) throw err
    console.log('The asm jobs are:', rows)

}

) */

module.exports = conn;