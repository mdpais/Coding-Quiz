var startBtn = document.querySelector(".start");
var question = document.querySelector(".question");
var options = document.querySelector(".options");
var answerStatus = document.querySelector(".answer-status");
var cardBody = document.querySelector(".card-body");
var header = document.querySelector(".timer");
var footer = document.querySelector(".highscore");

var storedHighScore = JSON.parse(localStorage.getItem("highScore"));
if(storedHighScore == null) {
    storedHighScore = {scoreStore: 0, initialStore: "no one"};
}
footer.textContent = "Highest score: " + storedHighScore.scoreStore + " by " + storedHighScore.initialStore;

// Set of questions for the quiz
var questionsArr = [
    {
        question: "What does HTML stand for?",
        option1: "Hyper Trainer Marking Language",
        option2: "Hyper Text Marketing Language",
        option3: "Hyper Text Markup Language",
        option4: "Hyper Text Markup Leveler",
        answer: "Hyper Text Markup Language"
    },
    {
        question: "In Java, a method is a container that holds classes.",
        option1: "True",
        option2: "False",
        answer: "False"
    },
    {
        question: "<h1>Text</h1> is the correct way of making a heading in HTML.",
        option1: "True",
        option2: "False",
        answer: "True"
    },
    {
        question: "Which of the following is the correct way to use the standard namespace in C++? ",
        option1: "Using namespace std;",
        option2: "Using namespace standard;",
        option3: "Using standard namespace;",
        option4: "Standard namespace used;",
        answer: "Using namespace std;"
    },
    {
        question: "What is the correct CSS syntax for making all the <span> elements bold?",
        option1: "span {text-size: bold}",
        option2: "span {font-weight: bold}",
        option3: "<span style='font-size: bold'>",
        option4: "<span style='text-size: bold'>",
        answer: "span {font-weight: bold}"
    },
    {
        question: "Is this the correct way to make an object in Java? Class class = new Class();",
        option1: "True",
        option2: "False",
        answer: "True"
    },
    {
        question: "Is this how you import something in C++? #include <string>",
        option1: "Yes",
        option2: "No",
        answer: "Yes"
    },
    {
        question: "How do you add a comment in a CSS file?",
        option1: "/* this is a comment */",
        option2: "// this is a comment //",
        option3: "// this is a comment",
        option4: "<!-- this is a comment-->",
        answer: "/* this is a comment */"
    },
    {
        question: "Is this HTML code correct? <html> <head> <title>Title</title> </head> <h1>Header</h1> <p>Paragraph</p> </html> ",
        option1: "Yes",
        option2: "No",
        answer: "No"
    },
    {
        question: "What property is used to change the text color of an element?",
        option1: "fontcolor:",
        option2: "textcolor:",
        option3: "color:",
        option4: "font-color:",
        answer: "color:"
    }
];

// Start the quiz
startBtn.addEventListener("click", function() {
    // Remove the start button
    startBtn.remove();
    quiz();
});

var questionIndex = 0;

// Quiz code
function quiz() {
    // Display question
    question.textContent = questionsArr[questionIndex]["question"];
    // Create buttons and display answer options
    for(var i = 1; i < Object.keys(questionsArr[questionIndex]).length - 1; i++){
        var newBtn = document.createElement("button");
        newBtn.className = "btn btn-primary mx-2 my-1";
        newBtn.textContent = questionsArr[questionIndex]["option" + i];
        options.appendChild(newBtn);
    }
}

var score = 0;

// Once an answer option is selected
options.addEventListener("click", function(event) {
    if(event.target.tagName == "BUTTON") {
        if(event.target.textContent == questionsArr[questionIndex].answer) {
            answerStatus.textContent = "That's absolutely right!";
            setTimeout(function(){
                answerStatus.innerHTML = '';
            }, 1000);
            score = score + 1;
            console.log("the score is " + score)
        } else 
        {
            answerStatus.textContent = "Sorry, that's wrong!";
            setTimeout(function() {
                answerStatus.innerHTML = '';
            }, 1000);
        }
        if(questionIndex > 8) {
            endQuiz();
        }
        else {
            // Clear all answer options
            options.innerHTML = "";
            // Run quiz code with next question
            questionIndex++;
            quiz();
        }
    }
});

var highScore;
var form;
var input = document.createElement("input");
var form = document.createElement("form");
form.setAttribute("class", "mt-2 form");
var submitButton = document.createElement("span");

function endQuiz() {
    storedHighScore = JSON.parse(localStorage.getItem("highScore"));
    question.textContent = "Game Over";
    if(score > storedHighScore.scoreStore) {
        form.textContent = "";
        options.textContent = "You broke the high score record with " + score + " correct answers.";
        // Create form to get initials for score
        var label = document.createElement("label");
        label.textContent = "Enter your initials:";
        input.setAttribute("type", "text");
        input.setAttribute("class", "mx-2");
        submitButton.textContent = "Submit";
        submitButton.setAttribute("class", "btn btn-primary");
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(submitButton);
        cardBody.insertBefore(form, cardBody.children[2]);
    }
    else if(score == storedHighScore.scoreStore) {
        options.textContent = "You tied the high score with " + score + " correct answers. You have to beat it.";
        okButton();
    }
    else {
        options.textContent = "You only scored " + score + ". Not good enough.";
        okButton();
    }
}

function okButton() {
    form.textContent = "";
    submitButton.textContent = "OK";
    submitButton.setAttribute("class", "btn btn-primary");
    form.appendChild(submitButton);
    cardBody.insertBefore(form, cardBody.children[2]);
    score = storedHighScore.scoreStore;
    input.value = storedHighScore.initialStore;
}

var restartGame = document.createElement("span");
var resetScore = document.createElement("span");

submitButton.addEventListener("click", function() {
    // create user object from submission
    form.textContent = "";
    highScore = {
      scoreStore: score,
      initialStore: input.value.trim()
    };
    console.log(highScore)
    // set new submission to local storage 
    localStorage.setItem("highScore", JSON.stringify(highScore));
    question.textContent = "Highest Score achieved in this Game";
    options.textContent = highScore.scoreStore + " by " + highScore.initialStore;
    footer.textContent = "Highest score: " + highScore.scoreStore + " by " + highScore.initialStore;
    restartGame.textContent = "Try Again";
    restartGame.setAttribute("class", "btn btn-primary mx-2");
    resetScore.textContent = "Reset High Score";
    resetScore.setAttribute("class", "btn btn-primary mx-2");
    form.appendChild(restartGame);
    form.appendChild(resetScore);
    cardBody.insertBefore(form, cardBody.children[2]);
  });

  restartGame.addEventListener("click", function() {
    options.textContent = "";
    form.remove();
    questionIndex = 0;
    score = 0;
    quiz();
  });

  resetScore.addEventListener("click", function() {
    highScore = {
        scoreStore: "0",
        initialStore: "no one"
      };
      localStorage.setItem("highScore", JSON.stringify(highScore));
      options.textContent = highScore.scoreStore + " by " + highScore.initialStore;
      footer.textContent = "Highest score: " + highScore.scoreStore + " by " + highScore.initialStore;
  });