const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["Java", "CSS", "Python", "SQL"],
    answer: 1,
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    options: ["int", "string", "let", "float"],
    answer: 2,
  },
  {
    question: "Which method selects an HTML element by ID?",
    options: [
      "getElementById()",
      "getElementByClass()",
      "queryById()",
      "selectId()",
    ],
    answer: 0,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "**"],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const progress = document.getElementById("progress");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  clearInterval(timer);

  const q = questions[currentQuestion];

  questionNumber.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;

  questionElement.textContent = q.question;

  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const div = document.createElement("div");

    div.textContent = option;
    div.classList.add("option");

    if (userAnswers[currentQuestion] === index) {
      div.classList.add("selected");
    }

    div.addEventListener("click", () => selectAnswer(index));

    optionsContainer.appendChild(div);
  });

  progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  prevBtn.disabled = currentQuestion === 0;

  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "Submit" : "Next";

  startTimer();
}

function selectAnswer(index) {
  if (userAnswers[currentQuestion] !== null) return;

  userAnswers[currentQuestion] = index;

  const options = document.querySelectorAll(".option");

  options.forEach((option, i) => {
    option.classList.add("disabled");

    if (i === questions[currentQuestion].answer) {
      option.classList.add("correct");
    }

    if (i === index && index !== questions[currentQuestion].answer) {
      option.classList.add("wrong");
    }
  });
}

function startTimer() {
  timeLeft = 15;
  timerElement.textContent = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;

    timerElement.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function showResult() {
  clearInterval(timer);

  score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  document.querySelector(".quiz-header").classList.add("hidden");
  document.querySelector(".progress-bar").classList.add("hidden");
  questionElement.classList.add("hidden");
  optionsContainer.classList.add("hidden");
  document.querySelector(".buttons").classList.add("hidden");

  const result = document.getElementById("result-container");

  result.classList.remove("hidden");

  document.getElementById("score").textContent =
    `Your Score: ${score} / ${questions.length}`;

  const percentage = (score / questions.length) * 100;

  document.getElementById("message").textContent =
    percentage >= 80
      ? "Excellent! Great job!"
      : percentage >= 50
        ? "Good effort! Keep practicing."
        : "Keep learning and try again!";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  userAnswers = new Array(questions.length).fill(null);

  document.querySelector(".quiz-header").classList.remove("hidden");
  document.querySelector(".progress-bar").classList.remove("hidden");
  questionElement.classList.remove("hidden");
  optionsContainer.classList.remove("hidden");
  document.querySelector(".buttons").classList.remove("hidden");

  document.getElementById("result-container").classList.add("hidden");

  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

prevBtn.addEventListener("click", previousQuestion);

loadQuestion();
