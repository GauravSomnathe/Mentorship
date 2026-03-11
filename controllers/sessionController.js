const Session = require("../models/Session");

exports.createSession = async(req,res)=>{
 try {
  const {lessonId,date,topic,summary} = req.body;

  // Validate input
  if (!lessonId || !date || !topic || !summary) {
    return res.status(400).json({ message: "LessonId, date, topic, and summary are required" });
  }
  if (topic.length < 3) {
    return res.status(400).json({ message: "Topic must be at least 3 characters" });
  }
  if (summary.length < 10) {
    return res.status(400).json({ message: "Summary must be at least 10 characters" });
  }

  const session = await Session.create({
   lessonId,
   date,
   topic,
   summary
  });

  res.status(201).json(session);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

exports.getSessions = async(req,res)=>{
 try {
  const sessions = await Session.find({lessonId:req.params.id});
  res.json(sessions);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};