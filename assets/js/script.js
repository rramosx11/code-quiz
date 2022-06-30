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
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.getElementById("timeholder");
var score = 0;
var gameover;

var currentIndex = 0;

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
  setQuestion();
};

var setQuestion = function () {
  resetAnswers();
  displayQuestion([currentIndex]);
};

var resetAnswers = function () {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild);
  }
};

var displayQuestion = function () {
  questionEl.innerText = questions[currentIndex].q;
  for (var i = 0; i < 4; i++) {
    var choicebutton = document.createElement("button");
    choicebutton.innerText = questions[currentIndex].choices[i];
    choicebutton.classList.add("btn");
    choicebutton.classList.add("choicebtn");
    choicebutton.setAttribute("value", questions[currentIndex].choices[i]);
    console.log(choicebutton);
    questionEl.appendChild(choicebutton);
    answerbuttonsEl.appendChild(choicebutton);
    choicebutton.addEventListener("click", answerCheck);
  }
};

//display correct! on screen
var answerCorrect = function () {
  if ((correctEl.className = "hide")) {
    correctEl.classList.remove("hide");
    correctEl.classList.add("banner");
    wrongEl.classList.remove("banner");
    wrongEl.classList.add("hide");
  }
};
//display wrong! on screen
var answerWrong = function () {
  if ((wrongEl.className = "hide")) {
    wrongEl.classList.remove("hide");
    wrongEl.classList.add("banner");
    correctEl.classList.remove("banner");
    correctEl.classList.add("hide");
  }
};

//check if answer is correct
var answerCheck = function (event) {
  var selectedanswer = event.target;
  if (questions[currentIndex].a === selectedanswer.innerText) {
    answerCorrect();
    score = score + 1;
  } else {
    answerWrong();
    score = score - 5;
    timeleft = timeleft - 10;
  }
  //go to next question, check if there is more questions
  currentIndex++;
  if ([currentIndex].length > currentIndex + 1) {
    setQuestion();
    //   } else {
    //     gameover = "true";
    //     showScore();
    //   }
  }
};

// var showScore = function () {
//   containerQuestionEl.classList.add("hide");
//   containerEndEl.classList.remove("hide");
//   containerEndEl.classList.add("show");

//   var scoreDisplay = document.createElement("p");
//   scoreDisplay.innerText = "Your final score is " + score + "!";
//   containerScoreEl.appendChild(scoreDisplay);
// };

//on start click, start game
btnStartEl.addEventListener("click", startQuiz);
