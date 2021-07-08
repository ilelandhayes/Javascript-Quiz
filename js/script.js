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
var highscoreEl = document.getElementById("highscore")


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

// function that shows saved high scores
function highScore() {

    contentEL.textContent = "";
    contentEL.setAttribute("style", "flex-direction: column;");
    startButtonEl.style.display = "none";

    timeLeft = 0;
    updateTimer();

    while (document.getElementById("saveGameDiv")) {
        descriptionEl.removeChild(document.getElementById("saveGameDiv"));
    }

    timeEL.setAttribute("style", "display: none");
    highscoreEl.setAttribute("style", "display: none");

    var highscores = JSON.parse(localStorage.getItem("highscores"));

    if (!highscores) {
        highscores = [];
    }

    highscores.sort((a, b) => b.userScore - a.userScore);

    highscores.forEach((highscore, index) => {
        var highscoreEl = document.createElement("h4");
        highscoreEl.textContent = `${(index + 1)}. ${highscore.userInitials}: ${highscore.userScore} points.`;
        highscoreEl.setAttribute("style", "background-color: #999999; padding: 10px; margin: 10px 0px 0px 5px; width: 100%;");
        contentEL.style.width = "100%";
        contentEL.appendChild(highscoreEl);
    })

    questionsEL.removeChild(questionsEL.firstChild);
    questionsEL.appendChild(contentEL);

    descriptionEl.innerText = "Highscores";

    highscoreButtons();
}

// function for creating buttons
function highscoreButtons() {

    var menuDiv = document.createElement("div");
    menuDiv.style.display = "flex";
    menuDiv.style.justifyContent = "center";
    menuDiv.setAttribute("style", "margin: 50px;");

    var goBackButtonEl = backButton(menuDiv);

    var clearHighscoresButtonEl = clearScoresButton();

    menuDiv.appendChild(goBackButtonEl);
    menuDiv.appendChild(clearHighscoresButtonEl);

    descriptionEl.appendChild(menuDiv);
}

// button for clearing highscores
function clearScoresButton() {


    var clearHighscoresButtonEl = document.createElement("button");
    clearHighscoresButtonEl.textContent = "Clear highscores";
    clearHighscoresButtonEl.addEventListener("click", function () {


        localStorage.clear("highscores");


        contentEL.innerHTML = "";
    });

    return clearHighscoresButtonEl;
}

// back button for returning to quiz start page
function backButton(parentDiv) {

    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.textContent = "Go Back";
    goBackButtonEl.addEventListener("click", function () {

        contentEL.innerHTML = "The following quiz will test you're knowledge on Javascript. Every wrong question will result in time being subracted from the timer. Take your time. GOOD LUCK!";
        descriptionEl.innerHTML = "Coding Quiz Challenge";


        startButtonEl.style.display = "flex";
        highscoreEl.setAttribute("style", "display: flex");
        timeEL.setAttribute("style", "display: flex");

    });

    return goBackButtonEl;
}


// stop game function, either when time is up or all questions are answered
function stopGame () {

    clearInterval(countdown)

    questionsEL.textContent = "";

    descriptionEl.textContent = "Game Over";

    var thankYouMessage = document.createElement("h3");
    thankYouMessage.setAttribute("id", "thankYou")
    thankYouMessage.textContent = `Final Score is ${score}`;

    saveGameElements();

    questionsEL.appendChild(thankYouMessage);
}

// keeping score
function scoreChange(value) {
    score = score + value;
    if (score < 0) {
        score = 0;
    }
}

// 
function saveGameElements() {

    var saveDivEl = document.createElement("div");
    saveDivEl.className = "saveGameDiv";
    saveDivEl.id = "saveGameDiv";

    var saveMessageEl = document.createElement("h4");
    saveMessageEl.textContent = "Enter Initials:";
    saveMessageEl.setAttribute("style", "margin-right: 10px;");

    var saveNameInputEl = document.createElement("input");
    saveNameInputEl.setAttribute("type", "text");
    saveNameInputEl.setAttribute("style", "margin-right: 10px;");

    function saveGame() {

        var highscores = JSON.parse(localStorage.getItem("highscores"));

        if (highscores) {
            highscores.push({
                userInitials: saveNameInputEl.value,
                userScore: score
            })
        } else {
            highscores = [{
                userInitials: saveNameInputEl.value,
                userScore: score
            }]
        }

        localStorage.setItem("highscores", JSON.stringify(highscores));

        score = 0;

        if (saveDivEl) {
            descriptionEl.removeChild(saveDivEl);
        }

        highScore();
    }

    var saveButtonEl = document.createElement("button");
    saveButtonEl.textContent = "Submit";

    saveButtonEl.addEventListener("click", saveGame);

    // Add save elements to parent element
    saveDivEl.appendChild(saveMessageEl);
    saveDivEl.appendChild(saveNameInputEl);
    saveDivEl.appendChild(saveButtonEl);

    descriptionEl.appendChild(saveDivEl);
}

// adding eventlisteners
function init() {

    document.getElementById("highscore").addEventListener("click", function () {
        highScore();
    });

    document.getElementById("startButton").addEventListener("click", function(){
        playGame();
    });
}

    document.getElementById("questions").addEventListener("click", function (event) {

        var element = event.target;

        if (element.matches("button")) {
            if (parseInt(element.getAttribute('index')) === correctIndex) {
                scoreChange(2);
                runQuestion();
                updateTimer();           
        }  else {
                scoreChange(-2);
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
