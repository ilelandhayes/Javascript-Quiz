var timeEL = document.querySelector("#timer")
var startButtonEl = document.getElementById("startButton");
let score = 0;


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

    countdown();

    startButtonEl.style.display = "none";

    runQuestion();
}

// timer function
function countdown() {

   var timeLeft = 60;
    timeEL.textContent =  'Time: ' + timeLeft;

   var timeInterval = setInterval(function() {

    if (timeLeft > -1) {
        timeEL.textContent = 'Time: ' + timeLeft;
        timeLeft--;
    } else if (timeLeft === -1) {
        timeLeft--;
    } else {
        timeEL.textContent = "Times up"
        clearInterval(timeInterval);   
    }
    }, 1000)
};

// timer updating if question is answered wrong
function updateTimer(wrongAnswer = false) {

    if (timeLeft === 0) {
        clearInterval(countdown);
        timeEl.textContent = `Times up`;
        stopGame();
        return;
    }

    timeEl.textContent = `${timeInterval} seconds remaing`;

    if (wrongAnswer) {
        timeEl.setAttribute("style", "color: black;");
    } else {
        timeEl.setAttribute("style", "color: black;");
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
        }
    }
});


init();
countdown();
