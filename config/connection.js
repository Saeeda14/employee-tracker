const mysql = require('mysql2'); 

// creating a connection to the mysql db 
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'employee_db'
});

// connecting to db
connection.connect((err) => {
    if (err) throw err; 
    console.log('Connected to MySQL Database');
});

module.exports = connection; 