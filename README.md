### Description ###

Node+React app for Code4000 workshop to be run on local server, allowing classroom instructors to test student's knowledge using questions with multiple choice.

- students can answer questions and see if their answers are correct
- students can see the correct option and explanation after they submit their answer
- students can use hints (one or two wrong options can be removed from single question's options list during the game)
- students can save their results into the app
- students can see their saved results at Hall of Fame


### To run locally ###

1. Clone the quiz repo:

2. 
Change directory to `quiz/server` and run `npm install` from there


3. Change directory to `quiz` and create .env file in the root of Quiz app

4. Add your data to .env:
```
SERVER_PORT= your server port (eg 5000)
CLIENT_PORT= your client port (eg 3000)
CLIENT_HOST=localhost
```

5. In Terminal, change directory to quiz/server and run `node server.js` command. You should see the output: 

```
Server running on port 5000
```

6. Open another Terminal tab, change directory to `quiz/client` and run `npm install` from there

7. Run `npm start` and check if application is rendered at your client port on localhost, for example: 
```
localhost:3000
```
8. You are ready to test your Javascript knowledge or add your own set of questions to the app.

### To add your own set of questions ###

*Temporary solution*

1. Create a new json file with the quiz topic as a file name at `server/questions` (for example, `geography.json`)

2. Add your data to the file as an array of objects. Use the following as the model: 

```
  [
  {"question": "What is the capital of Ireland?",
    "answer": "Dublin",
    "options":  ["Dublin", "London", "Belfast","Cardiff", "Edinburgh"],
    "commentForCorrect": "Yep, Dublin it is",
    "commentForIncorrect": "Nope, the correct answer is Dubin"
    }
  ]
```
3. Update `titles.json` file to add the new quiz id and name:

```
{"id":"geography", "name": "Geography Quiz"}
```

### Further development ###

The work on this app still continues and new features will be added, including:

- user authentication;
- database;
- admin dashboard where new quizes can be composed in browser;
- student dashboard showing individual student's data and recommendations how to improve their skills.

