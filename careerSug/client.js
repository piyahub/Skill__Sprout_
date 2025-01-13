import { getUserData, setUserData } from "./getUserData.js";

const container = document.getElementById('container');


async function storeCareerChoice(careerName) {  
    await setUserData(careerName);
    window.location.href = "../progressBarFinal/index.html";
}

document.addEventListener('DOMContentLoaded', async () => {

    const {reqDetails, userName} = await getUserData();

    fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({prompt: `My highest level of education is ${reqDetails['education']}. My interests are ${reqDetails['interests'].join(", ")}, Suggest 20 Possible career choice for me based on this information using this JSON schema: career = {"career name": name, "career discription": discription in 2 lines} Return: {"careers":list[career]}`}),
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const careers = JSON.parse(data.text);
            // console.log(careers["careers"]);
            careers["careers"].forEach((career, index) => {
                const careerOption = `<div class="career-card" data-index="${index}">
                                        <h1>${career["career name"]}</h1>
                                        <p>Work Discription</p>
                                        <div class="discription">
                                            ${career["career discription"]}
                                        </div>
                                    </div>`

                container.innerHTML += careerOption; 
            })
 

            document.querySelectorAll('.career-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const selectedCard = e.target.closest(".career-card");
                    const index = parseInt(selectedCard.dataset.index, 10);
                    // console.log(index, careers["careers"][0]);
                    const careerName = careers["careers"][index]["career name"];

                    storeCareerChoice(careerName);
                })
            })
        
        })
        .catch((err) => console.error('Error: ', err));
})