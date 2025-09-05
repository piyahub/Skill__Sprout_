const Question = require('../models/Question');
const Session = require('../models/Session');


// additional question dega existing question pr
exports.addQuestionsToSession = async (req, res) => {
    try{
      const { sessionId,questions}= req.body;

     if (!sessionId || !questions || !Array.isArray(questions)) {
         return res.status(400).json({ message: 'Invalid input data', success: false });
     }
      const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found', success: false });
        }

        // CREATE NEW QUESTIONS
        const createdQuestions = await Question.insertMany(
            questions.map((q) =>({
                session: sessionId,
                question:q.question,
                answer:q.answer,
            }))
        );

        // update session to include new questions Id

        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// pin or unpin question
exports.togglePinQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.id);

        if (!questions) {
            return res.status(404).json({ message: 'Question not found', success: false });
        }

        question.isPinned = !question.isPinned; // Toggle the isPinned status
        await question.save();
        res.status(200).json({ message: 'Question pin status updated', success: true, question });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// update note for question
exports.updateQuestionNote = async (req, res) => {
    try{
       
        const { note } = req.body;

        const question = await Question.findById(id);
        if (!question) {

            return res.status(404).json({ message: 'Question not found', success: false });
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({ message: 'Note updated successfully', success: true, question });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};