const {GoogleGenAI} = require('@google/genai');
const { conceptExplainPrompt, questionAnswerPrompt}= require("../utils/prompt");


const ai =  new GoogleGenAI ({
    apiKey: process.env.GEMINI_API_KEY});

    // yh questions aur answer dega gemini ki help se

const generateInterviewQuestions = async (req, res) => {
    try{
      const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: 'Missing required field in ai prompt', success: false });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents:prompt,
        });

        let rawText = response.text;


        // yh ``` aur json aur level htaega

        const cleanedText = rawText
        .replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim();
        

        // safe to parse

        const data = JSON.parse(cleanedText);

        res.status(200).json({ message: 'Interview questions generated successfully by ai', success: true, questions: data });
    } catch (error) {
        console.error('Error generating interview questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// yh questions ka detailed explanation dega

const generateConceptExplanation = async (req, res) => {
    try{


        const {question} = req.body;
        if (!question) {
            return res.status(400).json({ message: 'Question is required', success: false });
        }
        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // yh ``` aur json aur level htaega
        const cleanedText = rawText
        .replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim();
        // safe to parse
        const data = JSON.parse(cleanedText);
        res.status(200).json({ message: 'Concept explanation generated successfully by ai', success: true, explanation: data });
    } catch (error) {
        console.error('Error generating concept explanation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation
};
