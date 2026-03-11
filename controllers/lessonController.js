const Lesson = require("../models/Lesson");

// Create lesson (Mentor only)
exports.createLesson = async (req, res) => {
  try {
    // Check role
    if (req.user.role !== 'mentor') {
      return res.status(403).json({ message: "Only mentors can create lessons" });
    }

    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    if (title.length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters" });
    }
    if (description.length < 10) {
      return res.status(400).json({ message: "Description must be at least 10 characters" });
    }

    const lesson = await Lesson.create({
      title,
      description,
      mentorId: req.user._id
    });

    res.status(201).json(lesson);

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