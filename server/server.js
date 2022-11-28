const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser'); 
const questions = require('./questions/questions')
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

app.post("/save-result", (req, res) => {
    console.log(req.body);
})

app.post("/test", (req, res) => {
    let name = JSON.parse(req.body.name)
})

app.listen(5000, () => {
    console.log(`Server running on port 5000`)
})

