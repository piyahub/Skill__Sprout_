
import { getUserChoice, getUserProgress, storePathInDB, storeProgress, doesRoadMapExists, getTopics, englishFluency} from "./getUserChoiceAndRecordProgress.js";

const timeLine = document.getElementById('timeline')
// let timelineProgress = document.getElementById('timeline-progress');
const popUp = document.getElementById('popup');

const questionElement = document.getElementById('question-element')
const quizList = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const feedBackElement = document.getElementById('feedback-popup');


document.addEventListener('DOMContentLoaded', async() => { 
    
    const roadMapExists = await doesRoadMapExists();
    if (roadMapExists) {
        const topics = await getTopics();
        displayPath(topics);
    }
    else {
        const careerName = await getUserChoice(); 
        // const careerName = "Painter";
    
        fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({prompt: `My career aspiration is to become a ${careerName}. Give me a detailed road-map of the topics I need to learn to become a ${careerName} from the very basics using the JSON schema: topic = {"topic name":name, "topic discription": small discription of maximum 15 words} Return: {"topics":list[topic]} `}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const topics = JSON.parse(data.text);
                storeAndShow(topics["topics"]);
            })
            .catch((err) => console.error('Error: ', err));
    }
});

async function storeAndShow(topics) {
    await storePathInDB(topics);
    displayPath(topics);
}

async function displayPath(topics) {

    // console.log(topics);

    const eng = await englishFluency();

    if (eng === false) {
        const englishTimelineItem =    `<div class="timeline-item active">

                                    <div class="timeline-item-content">
                                        <h2>Basics of English</h2>
                                        <p>Learn basic spoken and written english.</p>
                                        <div class="buttons">
                                            <a href="#" class="resource-button">Resources</a>
                                        </div>
                                    </div>
                                </div>`;

        timeLine.innerHTML += englishTimelineItem;
    }
 
    topics.forEach((topic, index) => {
        const timeLineItem =    `<div class="timeline-item" id="item${index + 1}"  data-index="${index + 1}">

                                    <div class="timeline-item-content">
                                        <h2>${topic["topic name"]}</h2>
                                        <p>${topic["topic discription"]}</p>
                                        <div class="buttons">
                                            <a href="#" class="resource-button" data-target="item${index + 1}">Resources</a>
                                            <a href="#" class="test-button" data-target="item${index + 1}">Test</a>
                                        </div>
                                    </div>
                                </div>`;

        timeLine.innerHTML += timeLineItem;
    });
    
    increaseProgress.initialize(topics.length);

    testSetUp.initialize(topics);
    testSetUp.setUp(topics);
    // const {initialize, setUp} = await testSetUp();
    // await initialize(topics);
    // await  setUp(topics);

} 

async function restoreProgress(totalHeight, stepHeight, numItems) {
    let lastModuleIndex = await getUserProgress();
    console.log(lastModuleIndex);
    let progressHeight = 0;
    
    if (lastModuleIndex !== 0) {
        document.querySelectorAll(".test-button").forEach(btn => {
            const targetId = btn.getAttribute('data-target');
            const targetItem = document.getElementById(targetId);
            const index = parseInt(targetItem.dataset.index, 10);

            if (index <= lastModuleIndex) {
                targetItem.classList.add('active');

                if (progressHeight < totalHeight) {
                    progressHeight += stepHeight;
                    let timelineProgress = document.getElementById('timeline-progress');
                    timelineProgress.style.height = `${progressHeight}px`;
                }

                // console.log(timelineProgress.style.height);
                
                if (targetId === `item${numItems}`) {
                    trophy.style.transform = 'translate(-50%, -50%) scale(1)';
                    trophy.style.opacity = '1';
                    courseCompleteMessage.style.display = 'block';
                }
            }
        })
    }
    increaseProgress.initializeProgressHeight(progressHeight);
    lastModuleIndex += 1;
    return {lastModuleIndex, progressHeight};
}

const testSetUp = (() => {
    let numItems;
    let totalHeight;
    let stepHeight;
    let progressHeight;
    let currentModule;
    
    async function initialize(topics) {
        numItems = topics.length;
        totalHeight = numItems * 120;
        stepHeight = 156.25;
    
        const values = await restoreProgress(totalHeight, stepHeight, numItems);
        progressHeight = values['progressHeight'];
        currentModule = values['lastModuleIndex'];
        let timelineProgress = document.getElementById('timeline-progress');
        timelineProgress.style.height = `${progressHeight}px`;
    }

    async function setUp(topics) {
        document.querySelectorAll('.test-button').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
    
                const targetId = btn.getAttribute('data-target');
                const targetItem = document.getElementById(targetId);
                const index = parseInt(targetItem.dataset.index, 10);
    
                if (index !== currentModule || targetItem.classList.contains("active")) {
                    return;
                }
    
                takeTest(topics[currentModule - 1]["topic name"]);
            })
        })
    }

    async function incrementModule() {
        await storeProgress(currentModule);
        currentModule++;
    }

    function getCurrentModule() {
        return currentModule;
    }
    
    return {initialize, setUp, incrementModule, getCurrentModule};
})();

const increaseProgress = (() => {
    let progressHeight = 0;
    let numItems = 0; 

    function initialize(num) {
        numItems = num;
    }

    function initializeProgressHeight(height) {
        progressHeight = height;
    }

    function incrementProgress() {
        const totalHeight = numItems;
        const stepHeight = 156.25;

        if (progressHeight < totalHeight) {
            console.log(progressHeight);
            progressHeight += stepHeight;
            let timelineProgress = document.getElementById('timeline-progress');
            timelineProgress.style.height = `${progressHeight}px`;
        }
    }

    return {initialize, incrementProgress, initializeProgressHeight}
    
})();


async function takeTest(topic) {

    try {
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: `Give me 10 single choice, mcq pattern questions with 4 option per question among which only one is correct, on the topic ${topic} covering fundamentals and intermediate concepts of the topic using the JSON schema: question = {"question" : question, "answers": list[answers]} answers={"answer":answer, "trueValue": true if the answer is correct otherwise false} Return: {"questions" : list["question"]}`
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const questionObject = JSON.parse(data.text);
        console.log(topic);
        const questions = questionObject["questions"];

        popUp.style.display = "flex";

        const { initialize } = feedback(topic);
        initialize(topic);
        console.log(topic);
        startQuiz(questions);


    } catch (err) {
        console.error('Error generating questions for the quiz:', err);
    }

}

function waitForClick(buttonId) {
    return new Promise((resolve) => {
        const button = document.getElementById(buttonId);
        const handler = () => {
            button.removeEventListener('click', handler);
            resolve();
        };
        button.addEventListener('click', handler);
    });
}

async function startQuiz(questions) {
    let wrongAnswers = [];
    let correctAnswer;

    for (const queObj of questions) {
        
        while (quizList.firstChild) {
            quizList.removeChild(quizList.firstChild);
        }

        // nextBtn.disable = true;
        nextBtn.style.display = "none";

        questionElement.innerHTML = queObj["question"];
        queObj["answers"].forEach(ans => {
            const ansBtn = document.createElement('button');
            ansBtn.classList.add('ans-btn');
            ansBtn.innerHTML = ans["answer"];

            if (ans["trueValue"] === true) {
                correctAnswer = ansBtn.innerHTML;
            }

            quizList.appendChild(ansBtn);
        });

        console.log("Correct Answer: ", correctAnswer);

        document.querySelectorAll(".ans-btn").forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedAnswer = btn.innerHTML;

                if (selectedAnswer !== correctAnswer) {
                    wrongAnswers.push(queObj["question"]);
                    btn.classList.add('wrong');
                }

                document.querySelectorAll(".ans-btn").forEach(ansBtn => {
                    if (ansBtn.innerHTML === correctAnswer) {
                        ansBtn.classList.add('correct');
                    }

                    ansBtn.disable = true;
                });

                // nextBtn.disable = false;
                nextBtn.style.display = "inline";
            })
        });


        await waitForClick("next-btn");
    }

    if (wrongAnswers.length === 0) {
        // const {getCurrentModule, incrementModule} = await testSetUp();
        // const currentModule = getCurrentModule();
        const currentModule = testSetUp.getCurrentModule();
        console.log(currentModule);
        const targetItem = document.getElementById(`item${currentModule}`);
        targetItem.classList.add('active');
        await testSetUp.incrementModule();
        increaseProgress.incrementProgress();
    }
    else {
        const {showFeedback} = feedback();
        showFeedback(wrongAnswers);
    }
    popUp.style.display = "none";
};

function feedback() {
    let topic = "";

    function initialize(newTopic) {
        topic = newTopic;
    }

    async function showFeedback(wrongAnswers) {
        feedBackElement.style.display = "flex";

        const percentage = Math.min(100, Math.max(0, wrongAnswers.length * 10));
        const circle = document.getElementById('progress-circle');
        const circumference = 2 * Math.PI * 45; // 2πr
        const offset = (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;

        const text = document.getElementById('progress-text');
        text.textContent = `${wrongAnswers.length * 10}%`;

        try {
            const response = await fetch('http://localhost:3000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `I wasn't able to answer the questions ${wrongAnswers.join(" , ")}. These questions are on the topic ${topic}. List the name of the concepts and topics i need to learn to be able to answer theses quesions using the JSON schema: Return : {"topics" : list[topic name to study]}`
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            const topicObject = JSON.parse(data.text);
            const topics = topicObject["topics"];
    
            const improveTopics = document.getElementById("improve-topics");

            topics.forEach(topic => {
                const topicItem = document.createElement("li");
                topicItem.classList.add('topic-item');
                topicItem.innerHTML = topic;
                improveTopics.appendChild(topicItem);
            })

        } catch (err) {
            console.error('Error generating feedback:', err);
        }

        document.getElementById("close-btn").addEventListener('click', ()=> {
            feedBackElement.style.display = "none";
        })
    }

    return {initialize, showFeedback};
}




