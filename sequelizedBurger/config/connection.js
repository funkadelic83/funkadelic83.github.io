var mysql = require("mysql");

// var connection = mysql.createConnection(process.env.JAWSDB_URL);
// connection.connect();
// connection.query('SELECT 1 + 1 AS soluion', function(err, rows, fields) {
//     if (err) throw err;
//     console.log("The solution is: ", rows[0], solutoin);
// });
// connection.end();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "mike",
    password: "$aTan6969videoL0rd$",
    database: "burgers_db"
});

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'mike',
        password: '$aTan6969videoL0rd$',
        database: 'burgers_db'
    });
};

connection.connect(function(err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
