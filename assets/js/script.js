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
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
var timeleft;
var timerId;
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timeholder");
var score = 0;
var gameover;

var HighScores = [];

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
    a: "3. quotes",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "4. console.log()",
    choices: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log()",
    ],
  },
];

var setTime = function () {
  timeleft = 75;
  //   timerEl.textContent = timeleft;
};

var timercheck = setInterval(function () {
  timerEl.innerText = timeleft;
  timeleft--;

  if (gameover) {
    clearInterval(timercheck);
  }

  if (timeleft < 0) {
    showScore();
    timerEl.innerText = 0;
    clearInterval(timercheck);
  }
}, 1000);

var startQuiz = function () {
  containerQuizEl.classList.add("hide");
  containerQuizEl.classList.remove("show");
  containerQuestionEl.classList.remove("hide");
  containerQuestionEl.classList.add("show");
  //   timerId = setInterval(setTime, 1000);
  setTime();
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
    // score = score + 1;
  } else {
    answerWrong();
    // score = score - 5;
    timeleft = timeleft - 10;
  }
  //go to next question, check if there is more questions
  currentIndex++;
  if (currentIndex < questions.length) {
    setQuestion();
  } else {
    gameover = "true";
    showScore();
  }
};

//display total score

var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = "Your final score is " + timeleft + "!";
  containerScoreEl.appendChild(scoreDisplay);
};

//create high score values
var createHighScore = function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  formInitials.reset();

  var HighScore = {
    initials: initials,
    score: score,
  };

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {
    return b.score - a.score;
  });

  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML =
      HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }
  saveHighScore();
  displayHighScores();
};
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores));
};

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores");
  if (!LoadedHighScores) {
    return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {
    return b.score - a.score;
  });

  for (var i = 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerText =
      LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);
  }
};

//display high score screen from link or when intiials entered
var displayHighScores = function () {
  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameover = "true";

  if ((containerEndEl.className = "show")) {
    containerEndEl.classList.remove("show");
    containerEndEl.classList.add("hide");
  }
  if ((containerQuizEl.className = "show")) {
    containerQuizEl.classList.remove("show");
    containerQuizEl.classList.add("hide");
  }

  if ((containerQuestionEl.className = "show")) {
    containerQuestionEl.classList.remove("show");
    containerQuestionEl.classList.add("hide");
  }

  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }

  if ((wrongEl.className = "show")) {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
};
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);
};

var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide");
  containerHighScoresEl.classList.remove("show");
  containerQuizEl.classList.remove("hide");
  containerQuizEl.classList.add("show");
  containerScoreEl.removeChild(containerScoreEl.lastChild);
  currentIndex = 0;
  gameover = "";
  timerEl.textContent = 0;
  score = 0;

  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }
  if ((wrongEl.className = "show")) {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
};

loadHighScore();
//on start click, start game
btnStartEl.addEventListener("click", startQuiz);

//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore);

//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores);
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage);
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores);
