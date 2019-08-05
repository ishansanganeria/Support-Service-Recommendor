const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const date_time = require('date-and-time');
// const date = require('date');

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


    // YYYY-MM-DD
    // hh:mm:ss
    query = "CREATE TABLE stats (Serial_Number int NOT NULL,        Date DATE NOT NULL, Time TIME NOT NULL,        Battery_Life int,        Temperature int,        RAM int,    CPU int,        Disk int,            PRIMARY KEY(Serial_Number, Date, Time)    ); "
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Created table stats: " + JSON.stringify(result));
        console.log("\n")
    });
});


app.route('/notification/:data')
    .get((req, response) => {
        let data = JSON.parse(req.params['data'])

        const now = new Date();
        dt = date_time.format(now, 'YYYY/MM/DD HH:mm:ss');
        var res = dt.split(" ")
        date = res[0].replace('/', '-')
        date = date.replace('/', '-')
        time = res[1]

        serialNumber = data.serialNumber;
        batteryCapacity = data.batteryCapacity;
        temperature = data.temperature;
        ram = data.ram;
        cpu = data.cpu;
        disk = data.disk;

        console.log(date)


        sql = "INSERT INTO stats VALUES ( " + serialNumber + ",\"" + date + "\",\"" + time + "\"," + batteryCapacity + "," + temperature + "," + ram + "," + cpu + "," + disk + ");"
        // console.log(sql);

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted into table " + JSON.stringify(result));
            console.log("\n")
        });


        response.json(data)
    });

// SELECT AVG(Battery_Life) from stats
// WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)

app.route('/battery/:data')
    .get((req, response) => {

        let serialNumber = JSON.parse(req.params['data'])
        let date = getOldDate();
        sql = "SELECT AVG(Battery_Life) from stats WHERE Date > " + date + " AND Serial_Number = " + serialNumber + ";"
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("The average battery Life is " + JSON.stringify(result));
            console.log("\n")
            response.json(result);
        });
    });


app.listen(8080, () => {
    console.log('\nServer started!')
})


function getOldDate() {

    var date = new Date();
    date.setDate(date.getDate() - 7);

    if ((date.getMonth() + 1) < 10) {
        var finalDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
        var finalDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    return finalDate
}
