const questionAnswerPrompt = (role,experience,topicsToFocus,numberOfQuestions) => (`
    You are an AI trained to generate technical interview quesions and answers.

    Task:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code block inside.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    [
    {
      "question": "Question here?",
      "answer": "Answer here with code example if needed."},
      ...
      ]
      Important: Do NOT add any extra text. Only return valid JSON.
    `)

    const conceptExplainPrompt = (quesion) => (`
        
        You are an AI trained to generate explanations for a given interview question.
        Task:
        - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
        - Question: "${quesion}"
        - After the explanation, provided a short and clear title that summarizes the concept for the article or a page header .
        - Keep the formatting very clean and clear.
        - Return the result as a valid JSON object in the following format:
        {
            "title": "short title here?",
            "explanation": "Explanation here with code examples if needed."
        }
        Important: Do NOT add any extra text. Only return valid JSON.
        `);

        module.exports = {questionAnswerPrompt,conceptExplainPrompt};