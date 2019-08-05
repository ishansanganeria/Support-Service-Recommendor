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
        let dt = date_time.format(now, 'YYYY/MM/DD HH:mm:ss');
        let res = dt.split(" ")
        let date = res[0].replace('/', '-')
        date = date.replace('/', '-')
        let time = res[1]

        let serialNumber = data.serialNumber;
        let batteryCapacity = data.batteryCapacity;
        let temperature = data.temperature;
        let ram = data.ram;
        let cpu = data.cpu;
        let disk = data.disk;

        let sql = "INSERT INTO stats VALUES ( " + serialNumber + ",\"" + date + "\",\"" + time + "\"," + batteryCapacity + "," + temperature + "," + ram + "," + cpu + "," + disk + ");"

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted into table " + JSON.stringify(result));
            console.log("\n")
        });


        response.json(data)
    });

// SELECT AVG(Battery_Life) from stats
// WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)

function batteryAverage(serialNumber) {
    let promise = new Promise(function (resolve, reject) {
        let date = getOldDate();
        sql = "SELECT AVG(Battery_Life) from stats WHERE Date > " + date + " AND Serial_Number = " + serialNumber + ";"
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("The average battery Life is " + JSON.stringify(result));
            result = JSON.stringify(result);
            result = result.substring(result.indexOf(":") + 1, result.indexOf(":") + 3)
            resolve(result);
        })
    });
    return promise;
}

function cpuAverage(serialNumber) {
    let promise = new Promise(function (resolve, reject) {
        let date = getOldDate();
        sql = "SELECT AVG(CPU) from stats WHERE Date > " + date + " AND Serial_Number = " + serialNumber + ";"
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("The average cpu usage is " + JSON.stringify(result));
            result = JSON.stringify(result);
            result = result.substring(result.indexOf(":") + 1, result.indexOf(":") + 3)
            resolve(result);
        });
    })
    return promise
}

function diskAverage(serialNumber) {
    let promise = new Promise(function (resolve, reject) {
        let date = getOldDate();
        sql = "SELECT AVG(Disk) from stats WHERE Date > " + date + " AND Serial_Number = " + serialNumber + ";"
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Your used disk space is " + JSON.stringify(result));
            result = JSON.stringify(result);
            result = result.substring(result.indexOf(":") + 1, result.indexOf(":") + 3)
            resolve(result);
        });
    })
    return promise
}

function temperatureAverage(serialNumber) {
    let promise = new Promise(function (resolve, reject) {
        let date = getOldDate();
        sql = "SELECT AVG(Temperature) from stats WHERE Date > " + date + " AND Serial_Number = " + serialNumber + ";"
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("The average temperature is " + JSON.stringify(result));
            result = JSON.stringify(result);
            result = result.substring(result.indexOf(":") + 1, result.indexOf(":") + 3)
            resolve(result);
        })
    })
    return promise;
}

function ramAverage(serialNumber) {
    let promise = new Promise(function (resolve, reject) {
        let date = getOldDate();
        sql = "SELECT AVG(RAM) from stats WHERE Date > " + date + " AND Serial_Number = " + serialNumber + ";"
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("The average ram usage is " + JSON.stringify(result));
            result = JSON.stringify(result);
            result = result.substring(result.indexOf(":") + 1, result.indexOf(":") + 3)
            resolve(result);
        });
    })
    return promise;
}

app.route('/getStatus/:data')
    .get((req, response) => {
        let serialNumber = JSON.parse(req.params['data'])
        let ramAvg, cpuAvg, diskAvg, tempAvg, batteryAvg
        ramAverage(serialNumber)
            .then((ram) => {
                ramAvg = ram;
                temperatureAverage(serialNumber)
                    .then((temp) => {
                        tempAvg = temp;
                        diskAverage(serialNumber)
                            .then((disk) => {
                                diskAvg = disk;
                                cpuAverage(serialNumber)
                                    .then((cpu) => {
                                        cpuAvg = cpu;
                                        batteryAverage(serialNumber)
                                            .then((battery) => {
                                                batteryAvg = battery
                                                response.json({ramAvg, cpuAvg, diskAvg, tempAvg, batteryAvg})
                                            })
                                    })
                            })
                    })
            })
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
