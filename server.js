const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// ROUTES
app.use("/auth", require("./routes/authRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/lessons", require("./routes/lessonRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/sessions", require("./routes/sessionRoutes"));
app.use("/llm", require("./routes/llmRoutes"));

app.get("/", (req, res) => {
  res.send("Mentorship API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});