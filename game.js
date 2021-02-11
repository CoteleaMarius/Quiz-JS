
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

//alert(JSON.stringify(choices, null, 4));

let acceptingAnswers = false;
let availableQuestions = [];
let currentQuestion;
let questionCounter = 0;
let score = 0;

let questions = [
    {
        question: 'What we use to link Javascript to html',
        choice1: 'link',
        choice2: 'script',
        choice3: 'js',
        choice4: 'head',
        answer: 2
    },
    
    {
        question: 'How to link css in html',
        choice1: 'link',
        choice2: 'style',
        choice3: 'styling',
        choice4: 'head',
        answer: 1
    },
    {
        question: 'Where we can\'t store data using javascript',
        choice1: 'localStorage',
        choice2: 'sessionStorage',
        choice3: 'image',
        choice4: 'WebSQL',
        answer: 3
    }
];

// Used Constants
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 3;

// Exammple of IIFE (imideatly invocated function expression)
/*
(function(){
    setTimeout(()=>{alert('I"m comming for you !!')}, 2000);
})();*/

let startGame = () =>{
    questionCounter=0;
    score = 0;
    availableQuestions = [ ...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerHTML = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML=currentQuestion.question;

    choices.forEach((choice)=>{
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    // remove used question from list of questions
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        //if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            }, 1000);
        });
});

incrementScore = num => {
    score += num;
    scoreText.innerHTML = score;
}

startGame();

