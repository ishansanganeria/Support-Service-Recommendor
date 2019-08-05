const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dell"
});



con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    query = "DROP DATABASE dell_database"
    con.query(query, function (err, result) {
        try {
            if (err) throw err;
            console.log("Database deleted: " + JSON.stringify(result));
        } catch (error) {
            console.log("Database doesn't exist");
        }

    });

    query = "CREATE DATABASE dell_database"
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Database created: " + JSON.stringify(result));
    });

    query = "USE dell_database"
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Using Database dell_database: " + JSON.stringify(result));
    });

    query = "CREATE TABLE stats (Serial_Number int NOT NULL,        Date DATE NOT NULL, Time TIME NOT NULL,        Battery_Life int,        Temperature int,        RAM int,    CPU int,        Disk int,            PRIMARY KEY(Serial_Number, Date, Time)    ); "

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Created table stats: " + JSON.stringify(result));
    });



});


app.route('/notification/:data')
    .get(async (req, res) => {
        let data = JSON.parse(req.params['data'])

        INSERT INTO stats VALUES
        
        sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";

        query = "CREATE TABLE stats (Serial_Number int NOT NULL,        Date DATE NOT NULL, Time TIME NOT NULL,        Battery_Life int,        Temperature int,        RAM int,    CPU int,        Disk int,            PRIMARY KEY(Serial_Number, Date, Time)    ); "

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Created table stats: " + JSON.stringify(result));
        });


        res.json("response")
    });

app.listen(8080, () => {
    console.log('\nServer started!')
})
