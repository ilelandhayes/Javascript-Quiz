var timeEL = document.querySelector("#timer")

// timer function
function countdown() {
   var timeLeft = 10;
    timeEL.textContent =  'Time: ' + timeLeft;

   var timeInterval = setInterval(function() {
    if (timeLeft > -1) {
        timeEL.textContent = 'Time: ' + timeLeft;
        timeLeft--;
    } else {
        clearInterval(timeInterval);
        
    }
    }, 1000)
}; 

// variable for the questions
    var questions = [{
        question: "Inside which HTML tag do we put the Javascript?",
        a: "<java>",
        b: "<script>",
        c: "<js>",
        answer: "B"
    },
    {
        question: "How do you create a function in Javascript?",
        a: "function myFunction()",
        b: "function = myFunction()",
        c: "function:myFunction()",
        answer: "A"  
    },
    {
        question: "How to create a loop?",
        a: "(i > 0; i = 0; i++)",
        b: "(i = 0; i > 0; i++)",
        c: "(i > 0; i = 0; i--)",
        answer: "B" 
    },
    {
        prompt: "Inside which HTML tag do we put the Javascript?\n(1) <java>\n\ (2) <script>\n (3) <js>",
        answer: "2"  
    }
    ];


for (var i=0; i < questions.length; i++) {
}

countdown();