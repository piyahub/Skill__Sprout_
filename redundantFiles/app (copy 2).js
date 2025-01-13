const {GoogleGenerativeAI} = require('@google/generative-ai')
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

dotenv.config(); 

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async(req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
        
        const { prompt } = req.body;
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ],
            generationConfig: {
                response_mime_type: "application/json"
            }
        };
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(requestBody),
            } 
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API Error: ${error.error.message}`);
        }

        const data = await response.json();
        console.log(data.candidates[0].content.parts[0].text);
        
        res.json({text:data.candidates[0].content.parts[0].text});
    }
    catch(err) {
        console.error('Error Generating Career Choices: ', err);
        res.status(500).json({error: err.message});
    }
})

app.listen(port, () => console.log(`Server started at port ${port}.`));