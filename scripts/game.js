const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
//alert(JSON.stringify(choices, null, 4));
let acceptingAnswers = false;
let currentQuestion;
let questionCount = 0;
let availableQuestions = [];
let score = 0;
let questions = [
  {
    question: "What tag do we use to link JavaScript to HTML5 ?",
    choice1: "<link>",
    choice2: "<script>",
    choice3: "<body>",
    answer: 2,
  },
  {
    question: "What tag do we use to link CSS3 to HTML5 ?",
    choice1: "<style>",
    choice2: "<head>",
    choice3: "<link>",
    answer: 3,
  },
  {
    question: "What is JSON ?",
    choice1: "A file type",
    choice2: "A programming language",
    choice3: "A JavaScript command",
    answer: 1,
  },
];
const MAX_QUESTIONS = 3;
const CORECT_BONUS = 5;
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/end.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;
  choices.forEach((choices) => {
    const number = choice.dataset["number"];
    choices.innerHTML = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer==currentQuestion.answer ? "correct" : "incorrect"
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    },1000);
    
  });
});
startGame();
