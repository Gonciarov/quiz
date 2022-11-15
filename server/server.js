const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser'); 
const questions = require('./questions/questions')
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get("/test", cors(), (req, res) => {
    res.json(questions)
})

app.post("/test", (req, res) => {
    let name = JSON.parse(req.body.name)
    console.log(name)
})

app.listen(5000, () => {
    console.log(`Server running on port 5000`)
})

