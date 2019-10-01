global.root = process.env.BASEURL || "http://127.0.0.1:8181/";
global.log = console.log

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const mysql = require("mysql");

let database = mysql.createConnection({
    host: "localhost",
    user: "medt",
    password: "123",
    database: "schuelerverwaltung"
});

app.set('view engine', 'pug');
app.use(express.static('resources'));

app.get('/', (req, res) => {
    // database.query("INSERT INTO students VALUES (?,?,?,?)", ["testFirstName", "testLastName", "testClass", "testDir"], function (err) {
    //     if (!err) {
    //         log("suc")
    //     } else {
    //         console.log(err);
    //     }
    // });
    if (req.query.klasse) database.query("select * from students where cls = ?", [req.query.klasse], (...data) => {renderHome(res, data, req.query.klasse)})
    else database.query("select * from students", (...data) => {renderHome(res, data, req.query.klasse)})
});

function renderHome(res, data, cls = "") {
    if (data[0]) console.log(data[0])
    else {
        res.render('home', {name: "Home", students: JSON.stringify(data[1]), cls});
    }
    
    res.end()
}


app.post("/contactForm", function (req, res) {
    console.log(req.body);
    if (req.body.name && req.body.email && req.body.type && req.body.text && req.body.from) {
        console.log("New subscriber");
        console.log("---------------");
        database.query("INSERT INTO subscribers VALUES (?,?,?,?,?)", [req.body.name, req.body.email, req.body.type, req.body.text, req.body.from], function (err) {
            if (!err) {
                res.write(JSON.stringify({result: true}));
                res.end();
                sendMail("Name: "+req.body.name+"\nEmail: "+req.body.email+"\nTyp: "+req.body.type+"\nText: "+req.body.text,"\nVon: "+req.body.from);
            } else {
                console.log(err);
                res.write(JSON.stringify({result: false}));
                res.end();
            }
        });
    } else {
        res.write(JSON.stringify({err: "MISSING_DATA"}));
        res.end();
    }
});

app.post("/newsletter", function (req, res) {
    console.log(req.body);
    if (req.body.email) {
        database.query("INSERT INTO newsletter VALUES (?)", [req.body.email], function (err) {
            if (!err) {
                res.write(JSON.stringify({result: true}));
                res.end();
            } else {
                console.log(err);
                res.write(JSON.stringify({result: false}));
                res.end();
            }
        });
    } else {
        res.write(JSON.stringify({result: false}));
        res.end();
    }
});

app.listen(8181, function (err) {
    if (err)
        console.log(err);
    console.log("Listening on 8181");
});