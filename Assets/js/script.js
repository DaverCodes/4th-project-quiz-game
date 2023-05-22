// const timeLeftSpan = document.querySelector('#time-left');

let startButton = document.getElementById("start-button");
let nextButton = document.getElementById("next-button");
let showScore = document.getElementById("show-scores");
let hideScore = document.getElementById("hide-scores");

let titleHead = document.querySelector(".quiz-header");
let form = document.getElementById("html-Form");
let questionContainer = document.getElementById("question-container");
let timeLeft = 75;
let timer;
// let shuffledQues = [];
let currentQuestionIndex = 0;
let currentScore = 0;
// let scores = [];

const buttonDiv = document.querySelector(".button-div");
const questionElem = document.getElementById("question");
const answerButtonsElem = document.getElementById("question-buttons");

var questions = [
  {
    question: "Commonly used data types DO NOT include:?",
    answers: [
      { text: "strings", correct: false },
      { text: "booleans", correct: false },
      { text: "alerts", correct: true },
      { text: "numbers", correct: false },
    ],
  },

  {
    question:
      "The condition in an if / else statement is enclosed within ___.",
    answers: [
      { text: "quotes", correct: false },
      { text: "curly brackets", correct: false },
      { text: "parenthesis", correct: true },
      { text: "square brackets", correct: false },
    ],
  },

  {
    question: "Arrays in JavaScript can be used to store ___.",
    answers: [
      { text: "numbers and strings", correct: false },
      { text: "other arrays", correct: false },
      { text: "booleans", correct: false },
      { text: "all of the above", correct: true },
    ],
  },

  {
    question: "String values must be enclosed within ___ when being assigned to variables.",
    answers: [
      { text: "commas", correct: false },
      { text: "curly brackets", correct: false },
      { text: "quotes", correct: true },
      { text: "parentheses", correct: false },
    ],
  },

  {
    question: "a very useful tool used during development and debugging got printing content to the debugger is:",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "terminal / bash", correct: false },
      { text: "for loops", correct: false },
      { text: "console log", correct: true },
    ],
  },
];

function nextQuestion() {
  clearPage();
  showQuestions(shuffledQues[currentQuestionIndex]);
}

function clearPage() {
  nextButton.classList.add("hidden");
  while (answerButtonsElem.firstChild) {
    answerButtonsElem.removeChild(answerButtonsElem.firstChild);
  }
}

function statusClass(element, correct) {
  clearStatus(element);
  if (correct === "true") {
    element.classList.add("correct");
    element.classList.remove("js-buttons");
  } else {
    element.classList.add("incorrect");
    element.classList.remove("js-buttons");
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert("Please select an answer.");
    return;
  }


  if (playerAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  showQuestion();
}


function showQuestions(question) {
  questionElem.textContent = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("js-buttons");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", chooseAnswer);
    answerButtonsElem.appendChild(button);
  });
}

function countdown() {
  let seconds = timeLeft;
  timeLeftSpan.textContent = seconds;

  const countdownInterval = setInterval(() => {
    seconds--;
    timeLeftSpan.textContent = seconds;

    if (seconds === 0) {
      clearInterval(countdownInterval);
      // Add your logic here for when the timer reaches zero
    }
  }, 1000);

  startButton.classList.add("hidden");
  titleHead.classList.add("hidden");
  shuffledQues = questions.sort(() => Math.random() - 0.5);
  nextQuestion();
  nextButton.classList.add("hidden");
  currentQuestionIndex = 0;
}

function renderScoresTable(scores) {
  // Logic for rendering scores table
}

function init() {
  renderScoresTable(scores);
}

init();

function startQuiz() {
  const playerName = document.getElementById("name-input").value;
  if (playerName === "") {
    alert("Please enter your name.");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  showQuestion();
  startTimer();
}


function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    gameOver();
    return;
  }

  const questionElement = document.getElementById("question");
  questionElement.textContent = questions[currentQuestionIndex].question;

  const choicesElement = document.getElementById("choices");
  choicesElement.innerHTML = ""; // Clear previous choices

  const choices = questions[currentQuestionIndex].choices;
  for (let i = 0; i < choices.length; i++) {
    const choiceElement = document.createElement("div");
    choiceElement.innerHTML = `
      <input type="radio" name="answer" value="${i}">
      <label>${choices[i]}</label>
    `;
    choicesElement.appendChild(choiceElement);
  }
}


function startTimer() {
  let timeLeft = 30;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
      timeLeft--;
    } else {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

// showScore.addEventListener("click", () => {
//   showScore.classList.add("hidden");
// });

// hideScore.addEventListener("click", () => {
//   showScore.classList.remove("hidden");
// });

// nextButton.addEventListener("click", () => {
//   currentQuestionIndex++;
//   nextQuestion();
// });
  



  