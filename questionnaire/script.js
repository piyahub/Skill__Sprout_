// const { response } = require("express");
import {store} from './storeInDB.js'

const questions = [
    {
        question: "How good is your English?",
        answers: [
            {text:"I am comforatble in understanding english."},
            {text:"I am not comforatble in understanding english."},
        ],
        type: "single-choice",    
    }, 
    {
        question: "What is you highest level of education?",
        answers: [
            {text:"Less than high school."},
            {text:"High School (12th)."},
            {text:"Undergraducate"},
            {text:"Postgraduate"},
        ],
        type: "single-choice",
    },
    {
        question: "What are you interested in?",
        answers: [
            {text:"Science"},
            {text:"Maths"},
            {text:"Biology"},
            {text:"Engineering"},
            {text:"Arts"},
            {text:"Commerce"},
        ],
        type: "multi-choice",
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('option-buttons')
const backButton = document.getElementById('back-btn')
const nextButton = document.getElementById('next-btn')
const mcqContainer = document.getElementById('mutiple-choice');


let index = 0;
// let count = 0; // in multiple choice questions the user can generate new topis upto 20 times, this variable helps in keeping track of that
let userChoices = {}

function startQuestions() {
    index = 0;
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[index];
    questionElement.innerHTML = currentQuestion.question;

    if (currentQuestion.type === "multi-choice") {
        userChoices[index] = [];
        nextButton.disabled = false;


        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('little-btn');
            button.innerHTML = answer.text;
            mcqContainer.appendChild(button);
            button.addEventListener('click', generateChoices);
        });
    }
    else {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerHTML = answer.text;
            button.classList.add('btn');
            answerButtons.appendChild(button);
            
            button.addEventListener("click", selectAnswer);
        });
    }

}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let currentAns = userChoices[index];

    const options = document.querySelectorAll('.btn')

    nextButton.disabled = false;
    
    console.log(selectedBtn.innerHTML, currentAns);

    if (selectedBtn.innerHTML !== currentAns) {
        options.forEach(option => {
            console.log(option);
            option.classList.remove('selected');
        });

        currentAns = selectedBtn.innerHTML;
        userChoices[index] = currentAns;
        selectedBtn.classList.add('selected');
        console.log(selectedBtn);
    }
}

function selectAnswerMulti(e) {
    const selectedBtn = e.target;
    if (selectedBtn.classList.contains('selected')) {
        selectedBtn.classList.remove('selected');
    }
    else {
        selectedBtn.classList.add('selected');
    }
}



function addMultiAns() {
    const options = document.querySelectorAll('.btn')
    options.forEach(option => {
        if (option.classList.contains('selected')) {
            userChoices[index].push(option.innerHTML);
        }
    });
}

// function storeInDB() {
//     console.log("success");
// }

nextButton.addEventListener('click', (e) => {
    if (questions[index].type === 'multi-choice') {
        addMultiAns();
    }

    index = index + 1;

    if (index < questions.length) {
        showQuestion();
    }
    else {
        storeInDB();
    }
})

async function storeInDB() {
    let next = await store(questions, userChoices);
    console.log(next);
    if (next === true)
    window.location.href="../careerSug/suggestionPage.html";
    else {
        console.log("fat gaya");
    }
}

backButton.addEventListener('click', (e) => {
    if (index === 0) return;
    index = index - 1;
    showQuestion();
})

function resetState() {
    if (index === 0) {
        backButton.disabled = true;
    } 
    else {
        backButton.disabled = false;
    }

    nextButton.disabled = true;
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function generateChoices(e) {
    const selectedBtn = e.target;
    const topic = selectedBtn.innerHTML;
    userChoices[index].push(topic);
    selectedBtn.classList.add('selected-interest');
    

    fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({prompt: `List immediate sub topics to the topic ${topic} using this JSON schema: topics = {"topics" : list[topic]} Return: topics`}),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const topics = JSON.parse(data.text);
            topics["topics"].forEach(topic => {
                const button = document.createElement('button');
                button.classList.add('little-btn');
                button.innerHTML = topic;
                mcqContainer.appendChild(button);
                button.addEventListener('click', generateChoices);
            })

        }) 

    // const scrollableDiv = document.querySelector('.scrollable-div');
    // scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

startQuestions();