const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const questions = require('./questions/questions');
const fs = require('fs');
const replace = require('replace');
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());


app.get("/test", cors(), (req, res) => {
    res.json(questions)
    
})

app.get("/titles", cors(), (req, res) => {
    res.json([{1: "Хорошо ли вы помните роман Курта Воннегута \"Бойня №5\"?"}, 
    {2: "Сбылись ли предсказания Айзека Азимова?"},
    {3: "Что вы знаете о ГДР?"}
])
    
})

app.get('/1', cors(), (req, res) => {
    res.json(questions)
})

app.post("/save-result", checkStudentNumber, (req, res) => {
    let {result, name, prisonNumber} = req.body;
    result = result.toLowerCase();
    name = name.toLowerCase();
    prisonNumber = prisonNumber.toLowerCase();
    let rawdata = fs.readFileSync('results.json');
    let data = JSON.parse(rawdata);
    if (typeof data.results[prisonNumber] !== 'undefined') {
        
        console.log(`{"${prisonNumber}":{"score":"${result}","name":"${name}"}}`)
        replace({
            regex: data.results[prisonNumber]["score"],
            replacement: result,
            paths: ['results.json'],
            recursive: true,
            silent: true,
        });
        res.send(JSON.stringify({status: 'ok'}));
     } else {
        data.results[prisonNumber] = {"score": result,"name": name}
        fs.writeFile('results.json', JSON.stringify(data), 'utf8', err => {
            if (err) throw err;
            res.send(JSON.stringify({status: 'ok'}));
        })
     }
})

app.post("/test", (req, res) => {
    let name = JSON.parse(req.body.name);
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

app.listen(5000, () => {
    console.log(`Server running on port 5000`)
})

