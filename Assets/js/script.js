let currentQuestionIndex = 0;
let score = 0;
let timer;
// Quiz questions and answers
const questions = [
  {
    question: "Commonly used data types DO NOT include:?",
    choices: ["strings", "alerts", "booleans", "numbers"],
    answer: 1 // Index of the correct answer in the choices array
  },
  {
    question: "The condition in an if / else statement is enclosed within ___.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: 2
  },
  {
    question: "Arrays in JavaScript can be used to store ___.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: 3
  },
  {
    question: "a very useful tool used during development and debugging got printing content to the debugger is:",
    choices: ["ConsoleLog", "terminal / bash", "for loops", "JavaScript"],
    answer: 0
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: 2
  },
];


// Start the quiz
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

// Add event listener to the "Start" button
document.getElementById("start-button").addEventListener("click", startQuiz);

// Show a question
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

// Submit an answer
function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert("Please select an answer.");
    return;
  }

  const playerAnswer = parseInt(selectedAnswer.value, 10);
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (playerAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  showQuestion();
}

// Start the timer
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

// Save player's name and score to local storage
function saveScore(playerName, score) {
  const scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
  scores.push({ name: playerName, score: score });
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Display high scores
function displayHighScores() {
  const scores = localStorage.getItem("scores");
  if (scores) {
    const parsedScores = JSON.parse(scores);
    const sortedScores = parsedScores.sort((a, b) => b.score - a.score);

    const highScoresList = document.getElementById("high-scores");
    highScoresList.innerHTML = ""; // Clear previous high scores

    sortedScores.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score} points`;
      highScoresList.appendChild(listItem);
    });
  }
}

// Game over
function gameOver() {
  clearInterval(timer);

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "block";

  const playerName = document.getElementById("name-input").value;
  document.getElementById("player-name").textContent = `Player: ${playerName}`;
  document.getElementById("score").textContent = `Score: ${score} points`;

  saveScore(playerName, score);
  displayHighScores();
}

// Play again
function playAgain() {
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";

  currentQuestionIndex = 0;
  score = 0;
}
