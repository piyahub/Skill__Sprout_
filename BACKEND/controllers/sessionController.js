const Session = require('../models/Session');
const Question = require('../models/Question');

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user.id;

    if (!role || !experience || !topicsToFocus || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Invalid input data', success: false });
    }

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Question.insertMany(
      questions.map((q) => ({
        session: session._id,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions = questionDocs.map((q) => q._id);
    await session.save();

    res.status(201).json({ message: 'Session created successfully', success: true, session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('questions');
    res.status(200).json({ message: 'Sessions fetched successfully', success: true, sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: 'questions',
        options: { sort: { isPinned: -1, createdAt: -1 } },
      })
      .exec();
    if (!session) {
      return res.status(404).json({ message: 'Session not found', success: false });
    }
    res.status(200).json({ message: 'Session fetched successfully', success: true, session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found', success: false });
    }

    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this session', success: false });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();
    res.status(200).json({ message: 'Session deleted successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};