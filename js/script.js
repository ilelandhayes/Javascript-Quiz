// refers to time left, score, answers that are correct
let timeLeft = 0;
let score = 0;
let correctIndex = null;

// refers to timer
var countdown = null;

// variables on the page
var timeEL = document.getElementById("timer");
var startButtonEl = document.getElementById("startButton");
var titleEL = document.getElementById("title");
var contentEL = document.getElementById("content");
var questionsEL = document.getElementById("questions");
var descriptionEl = document.getElementById("description")


// variable for questions
var question = [{
    question: "Inside which HTML tag do we put the Javascript?",
    answers: [
     "<java>",
     "<script>",
     "<js>"],
    correctAnswer: 1
    },
    {
    question: "How do you create a function in Javascript?",
    answers: [
     "function myFunction()",
     "function = myFunction()",
     "function:myFunction()"],
    correctAnswer: 0  
    },
    {
    question: "How to create a loop?",
    answers: [
     "(i > 0; i = 0; i++)",
     "(i = 0; i > 0; i++)",
     "(i > 0; i = 0; i--)"],
    correctAnswer: 1 
    },
    {
    question: "How to do a multy line comment in Javascript?",
    answers: [
     ":/ Comment /:",
     "/> Comment >/",
     "/* Comment */"],
    correctAnswer: 2  
    }
    ];


function playGame() {

    timer(60);

    startButtonEl.style.display = "none";

    runQuestion();
}

// timer function
function timer(duractionInSeconds) {

   timeLeft = duractionInSeconds;
   countdown = setInterval(function() {

    if (timeLeft > 1) {
        updateTimer();
        timeLeft--;
    } else if (timeLeft === 1) {
        updateTimer();
        timeLeft--;
    } else {
        timeEL.textContent = "Times up"
        stopGame();
        clearInterval(countdown);   
    }
    }, 1000)
};

// updating timer if question is answered wrong
function updateTimer (wrongAnswer = false) {
    if (timeLeft === 0) {
        clearInterval(countdown);
        timeEL.textContent = `Out of Time`;
        stopGame();
        return;
    }
    timeEL.textContent = `Time: ${timeLeft}`;
    if (wrongAnswer) {
        timeEL.setAttribute("style", "color: red;");
    } else {
        timeEL.setAttribute("style", "color: white;");
    }
  }

// pulling random questions
function pullQuestion () {

    var randomIndex = Math.floor(Math.random() * question.length)
    var randomQuestion = question[randomIndex];

    question.splice(randomIndex, 1);

    return randomQuestion;  
}

// function to pool questions
function runQuestion() {

    var randomQuestion = pullQuestion();

    if (randomQuestion === undefined) {
        stopGame();
        return;
    }
    
    var questionEl = document.getElementById("description");
    questionEl.textContent = randomQuestion.question;
    
     var ansEl = document.getElementById("questions");
     ansEl.textContent = "";
    
    randomQuestion.answers.forEach((answer, index) => {
        var ans = document.createElement("button");
        ans.textContent = ((index + 1) + ": " + answer);
        ans.setAttribute("style", "display: block; height: 40px;")
        ans.setAttribute("index", index);
        ansEl.appendChild(ans);
    })
    
    correctIndex = randomQuestion.correctAnswer;
}

// stop game function, either when time is up or all questions are answered
function stopGame () {

    clearInterval(countdown)

    questionsEL.textContent = "";

    descriptionEl.textContent = "Game Over";

    var thankYouMessage = document.createElement("h3");
    thankYouMessage.setAttribute("id", "thankYou")
    thankYouMessage.textContent = `Final Score is ${score}`;

    questionsEL.appendChild(thankYouMessage);
}

// keeping score
function scoreChange(value) {
    score = score + value;
    if (score < 0) {
        score = 0;
    }
}

// adding eventlisteners
function init() {
    document.getElementById("startButton").addEventListener("click", function(){
        playGame();
    });
}

    document.getElementById("questions").addEventListener("click", function (event) {

        var element = event.target;

        if (element.matches("button")) {
            if (parseInt(element.getAttribute('index')) === correctIndex) {
                runQuestion();
                updateTimer();
                scoreChange(1);           
        }  else {
                scoreChange(-1);
            if (timeLeft >= 10) {
                timeLeft = timeLeft - 10;
            } else {
                timeLeft = 0;
            }
                updateTimer(true);
                runQuestion();
        }
    }
});


init();
