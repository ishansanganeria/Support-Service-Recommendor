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
            console.log("\n")
        } catch (error) {
            console.log("Database doesn't exist");
            console.log("\n")
        }

    });

    query = "CREATE DATABASE dell_database"
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Database created: " + JSON.stringify(result));
        console.log("\n")
    });

    query = "USE dell_database"
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Using Database dell_database: " + JSON.stringify(result));
        console.log("\n")
    });

    query = "CREATE TABLE sys_info (Serial_Number int NOT NULL, batteryCapacity int NOT NULL, totalRAM int NOT NULL, totalCPU VARCHAR(10),  totalDisk int NOT NULL, PRIMARY KEY(Serial_Number));"

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Created table stats: " + JSON.stringify(result));
        console.log("\n")
    });

    // YYYY-MM-DD
    // hh:mm:ss
    query = "CREATE TABLE stats (Serial_Number int NOT NULL,        Date DATE NOT NULL, Time TIME NOT NULL,        Battery_Life int,        Temperature int,        RAM int,    CPU int,        Disk int,            PRIMARY KEY(Serial_Number, Date, Time),FOREIGN KEY (Serial_Number) REFERENCES sys_info(Serial_Number)    ); "
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Created table stats: " + JSON.stringify(result));
        console.log("\n")
    });
});