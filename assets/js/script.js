// variables

var containerQuestionEl = document.getElementById("question-container");
var containerQuizEl = document.getElementById("quiz-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var ViewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var btnStartEl = document.querySelector("#start-quiz");
var timeleft = 75;
var timerId;
var timerEl = document.getElementById("timeholder");
var gameover;

var questions = [
  {
    q: "Commonly used data types DO NOT include:",
    a: "2. booleans",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
  },
  {
    q: "The condition in an if/else statement is enclosed within  __________.",
    a: "3. parenthesis",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parenthesis",
      "4. square brackets",
    ],
  },
  {
    q: "Arrays in Javascript can be used to store __________.",
    a: "4. all of the above",
    choices: ["1. numbers", "2. booleans", "3. strings", "4. all of the above"],
  },
  {
    q: "String values must be enclosed within __________ when being assigned to variables.",
    a: "4. parenthesis",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "4. console log",
    choices: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console log",
    ],
  },
];

var setTime = function () {
  timeleft--;
  timerEl.textContent = timeleft;
};

// // var timercheck = setInterval(function () {
// //   console.log(timerEl);
// //   var timerEl;

//   if (gameover) {
//     clearInterval(timercheck);
//   }

//   if (timeleft < 0) {
//     showScore();
//     timerEl.textContent = 0;
//     clearInterval(timercheck);
//   }
// }, 1000);

var startQuiz = function () {
  containerQuizEl.classList.add("hide");
  containerQuizEl.classList.remove("show");
  containerQuestionEl.classList.remove("hide");
  containerQuestionEl.classList.add("show");
  timerId = setInterval(setTime, 1000);
  displayQuestion();
};

var currentIndex = 0;
function displayQuestion() {
  for (var i = 0; i < 4; i++) {
    var choicebutton = document.createElement("button");
    choicebutton.innerText = questions[currentIndex].choices[i];
    choicebutton.classList.add("btn");
    choicebutton.classList.add("choicebtn");
    choicebutton.setAttribute("value", questions[currentIndex].choices[i]);
    console.log(choicebutton);
    containerQuestionEl.appendChild(choicebutton);
  }
}

//on start click, start game
btnStartEl.addEventListener("click", startQuiz);
