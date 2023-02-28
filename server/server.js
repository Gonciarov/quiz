const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const fs = require('fs');
const replace = require('replace');
require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT;
const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;
app.use(cors({
    origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`
}));
app.use(bodyParser.json());


app.get("/test", cors(), (req, res) => {
    res.json({"title": "quizz-app"})
    
})

app.get("/titles", cors(), (req, res) => {
    let rawData = fs.readFileSync('./questions/titles.json');
    let data = JSON.parse(rawData);
    res.json(JSON.stringify(data.titles))
    
})

app.get('/quizzes/:quizId', cors(), (req, res) => {
    let quizId = req.params.quizId;
    let rawdata = fs.readFileSync(`./questions/${quizId}.json`);
    let questions = JSON.parse(rawdata)
    res.json(questions)
})

app.post("/save-result", checkStudentNumber, (req, res) => {
    let {result, name, prisonNumber, quizName} = req.body;
    name = name.toLowerCase();
    result = result.toString();
    prisonNumber = prisonNumber.toLowerCase();
    let rawdata = fs.readFileSync('results.json');
    let studentsList = JSON.parse(fs.readFileSync('students.json'))["students"];
    let data = JSON.parse(rawdata);
    console.log(data);
    if (studentsList[prisonNumber] === name) {
    if (typeof data[quizName] != "undefined") {
        if (typeof data[quizName][prisonNumber] != "undefined") {
        data[quizName][prisonNumber] = result;
        fs.writeFile('results.json', JSON.stringify(data), 'utf8', err => {
            if (err) throw err;
        })
    } else {
        data[quizName][prisonNumber] = result;
        fs.writeFile('results.json', JSON.stringify(data), 'utf8', err => {
            if (err) throw err;
        })
    }
        res.send(JSON.stringify({status: 'ok'}));
     } else {
        data[quizName] = {};
        data[quizName][prisonNumber] = result;
        fs.writeFile('results.json', JSON.stringify(data), 'utf8', err => {
            if (err) throw err;
            res.send(JSON.stringify({status: 'ok'}));
        })
     }
    } else {
        res.send(JSON.stringify({status: 'Name and prison number do not match'}));
    }
})

app.post("/test", (req, res) => {
    let name = JSON.parse(req.body.name);
})


app.get('/hall-of-fame', cors(), (req, res) => {
    const rawData = fs.readFileSync('results.json');
    const data = JSON.parse(rawData);
    res.json(data);
})

app.get('/students-list', cors(), (req, res) => {
    const rawStudents = fs.readFileSync('students.json');
    const students = JSON.parse(rawStudents);
    res.json(students);
})



function checkStudentNumber(req, res, next) {
    let {prisonNumber} = req.body;
    let rawdata = fs.readFileSync('students.json');
    let data = JSON.parse(rawdata);
    if (typeof data.students[prisonNumber.toLowerCase()] !== 'undefined') {
       next()
    } else {
        res.send(JSON.stringify({status: "student does not exist"}))
    }
}

app.listen(SERVER_PORT, () => {
    console.log(`Server running on ${SERVER_PORT}`)
})

