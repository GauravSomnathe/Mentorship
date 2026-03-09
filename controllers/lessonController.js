const Lesson = require("../models/Lesson");

// Create lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;

    const lesson = await Lesson.create({
      title,
      description,
      mentorId: req.user._id
    });

    res.json(lesson);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lessons
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};