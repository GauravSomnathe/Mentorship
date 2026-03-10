# Mentorship Backend API

A Node.js + Express backend for a mentorship platform where **parents can book lessons for students and mentors can conduct sessions**.  
The system also includes an **LLM-based summary feature** for session notes.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- OpenAI API (for text summarization)

---

## 📂 Project Structure


mentorship-backend
│
├── config
│ └── db.js
│
├── controllers
│ ├── authController.js
│ ├── studentController.js
│ ├── lessonController.js
│ ├── bookingController.js
│ ├── sessionController.js
│ └── llmController.js
│
├── middleware
│ └── authMiddleware.js
│
├── models
│ ├── User.js
│ ├── Student.js
│ ├── Lesson.js
│ ├── Booking.js
│ └── Session.js
│
├── routes
│ ├── authRoutes.js
│ ├── studentRoutes.js
│ ├── lessonRoutes.js
│ ├── bookingRoutes.js
│ ├── sessionRoutes.js
│ └── llmRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js


---

# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/mentorship.git
2️⃣ Navigate to project
cd mentorship-backend
3️⃣ Install dependencies
npm install
4️⃣ Setup environment variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
5️⃣ Start the server
npm run dev

Server runs on:

http://localhost:5000
🔑 API Endpoints
Authentication
Signup
POST /auth/signup

Example body:

{
  "name": "Gaurav",
  "email": "gaurav@test.com",
  "password": "123456",
  "role": "parent"
}
Login
POST /auth/login
{
  "email": "gaurav@test.com",
  "password": "123456"
}

Returns JWT token.

👨‍🎓 Students
Create Student
POST /students
📚 Lessons
Create Lesson (Mentor)
POST /lessons
📅 Bookings
Book Lesson
POST /bookings

Example body:

{
  "studentId": "STUDENT_ID",
  "lessonId": "LESSON_ID"
}
🧑‍🏫 Sessions
Create Session
POST /sessions
Get Sessions for Lesson
GET /sessions/lesson/:id
🤖 LLM Summary
Summarize Session Notes
POST /llm/summarize

Example body:

{
  "text": "Artificial intelligence helps automate tasks and analyze large datasets."
}
📬 Testing

You can test the API using:

Postman

Thunder Client

curl

📌 Features

JWT authentication

Role-based access (Parent / Mentor)

Lesson booking system

Session tracking

AI-powered text summarization

🛡️ Security

Password hashing with bcrypt

JWT token authentication

Environment variables for secrets
