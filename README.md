# Mentorship Platform Backend

A simplified backend for a mentorship platform where parents, students, and mentors interact. Built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [LLM Integration](#llm-integration)
- [Security Practices](#security-practices)

---

## Features

✅ **Authentication System**
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (Parent, Mentor)
- Students created by parents

✅ **Parent Features**
- Create student accounts under their profile
- Book lessons for students
- View their students and bookings

✅ **Mentor Features**
- Create and manage lessons
- View lesson details

✅ **Lesson & Session Management**
- Mentors create lessons with title and description
- Sessions track lesson progress with date, topic, and summary
- Each session belongs to a lesson

✅ **LLM Text Summarization**
- OpenAI integration for text summarization
- Input validation (text length checks)
- Error handling with proper HTTP status codes
- Environment variable configuration

✅ **Data Validation & Error Handling**
- Input validation on all endpoints
- Field validation in database schemas
- Comprehensive error responses
- Role-based permission checks

---

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **LLM:** OpenAI API
- **Environment:** dotenv

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- OpenAI API key (for LLM feature)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd mentorship-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (see [Environment Variables](#environment-variables))

4. **Start the server**
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/mentorship

# Server
PORT=5000

# JWT
JWT_SECRET=your_jwt_secret_key_here

# OpenAI API (for LLM feature)
OPENAI_API_KEY=your_openai_api_key_here
```

### Configuration Notes
- **MONGODB_URI:** Use MongoDB Cloud (Atlas) for production
- **JWT_SECRET:** Use a strong random string
- **OPENAI_API_KEY:** Get from [OpenAI Platform](https://platform.openai.com)

---

## Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
node server.js
```

Server runs on `http://localhost:5000` by default.

---

## API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication
Protected routes require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 1. Authentication Endpoints

#### Sign Up
- **POST** `/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "parent"
  }
  ```
- **Note:** Role must be `"parent"` or `"mentor"`. Students are created by parents.
- **Response:** `{ "token": "jwt_token" }`
- **Status:** 201 (Created)

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** `{ "token": "jwt_token" }`
- **Status:** 200 (OK)

#### Get Current User
- **GET** `/auth/me` (Protected)
- **Response:** User object with name, email, role
- **Status:** 200 (OK)

---

### 2. Student Endpoints (Parents only)

#### Create Student
- **POST** `/students` (Protected)
- **Body:**
  ```json
  {
    "name": "Alice Smith",
    "age": 12
  }
  ```
- **Response:** Student object with parentId
- **Status:** 201 (Created)
- **Note:** Only parents can create students

#### Get Students
- **GET** `/students` (Protected)
- **Response:** Array of students belonging to the authenticated parent
- **Status:** 200 (OK)

---

### 3. Lesson Endpoints (Mentors only)

#### Create Lesson
- **POST** `/lessons` (Protected)
- **Body:**
  ```json
  {
    "title": "Python Basics",
    "description": "Learn Python fundamentals including variables, loops, and functions"
  }
  ```
- **Response:** Lesson object with mentorId
- **Status:** 201 (Created)
- **Note:** Only mentors can create lessons

#### Get All Lessons
- **GET** `/lessons`
- **Response:** Array of all lessons
- **Status:** 200 (OK)

---

### 4. Booking Endpoints (Parents only)

#### Create Booking
- **POST** `/bookings` (Protected)
- **Body:**
  ```json
  {
    "studentId": "60d5ec49c1234567890abcde",
    "lessonId": "60d5ec49c1234567890abcdf"
  }
  ```
- **Response:** Booking object with parentId
- **Status:** 201 (Created)
- **Note:** Only parents can create bookings

#### Get Bookings
- **GET** `/bookings` (Protected)
- **Response:** Array of bookings for the authenticated parent
- **Status:** 200 (OK)

---

### 5. Session Endpoints

#### Create Session
- **POST** `/sessions` (Protected)
- **Body:**
  ```json
  {
    "lessonId": "60d5ec49c1234567890abcdf",
    "date": "2026-03-20T10:00:00Z",
    "topic": "Variable Types and Operations",
    "summary": "Covered integers, floats, strings, and basic arithmetic operations in Python"
  }
  ```
- **Response:** Session object
- **Status:** 201 (Created)

#### Get Sessions for a Lesson
- **GET** `/sessions/lesson/:id`
- **Response:** Array of sessions for the specified lesson
- **Status:** 200 (OK)

---

### 6. LLM Summarization Endpoint

#### Summarize Text
- **POST** `/llm/summarize`
- **Body:**
  ```json
  {
    "text": "Artificial intelligence has transformed many industries. Machine learning algorithms can analyze large datasets to identify patterns..."
  }
  ```
- **Response:**
  ```json
  {
    "summary": "• AI has revolutionized multiple industries\n• Machine learning identifies patterns in large datasets\n• Practical applications span healthcare, finance, and technology",
    "model": "gpt-4o-mini"
  }
  ```
- **Status:** 200 (OK)

#### Input Validation
- **400 Bad Request:** Text is missing, empty, or less than 50 characters
- **413 Payload Too Large:** Text exceeds 10,000 characters
- **429 Too Many Requests:** Rate limit exceeded (OpenAI quota)
- **502 Bad Gateway:** LLM service error

#### Examples

**Valid Request:**
```bash
curl -X POST http://localhost:5000/llm/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Artificial intelligence has transformed many industries. Machine learning algorithms can analyze large datasets to identify patterns and make predictions without being explicitly programmed. Deep learning uses neural networks to process complex information."
  }'
```

**Short Text Error (< 50 chars):**
```bash
curl -X POST http://localhost:5000/llm/summarize \
  -H "Content-Type: application/json" \
  -d '{ "text": "AI is cool" }'
```
Response: `{ "message": "Text too short" }` (400)

**Missing Text:**
```bash
curl -X POST http://localhost:5000/llm/summarize \
  -H "Content-Type: application/json" \
  -d '{}'
```
Response: `{ "message": "Text required" }` (400)

---

## LLM Integration

### Configuration

1. **Get OpenAI API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com)
   - Create an account and generate an API key
   - Ensure you have credits in your account

2. **Set Environment Variable:**
   ```env
   OPENAI_API_KEY=sk-...
   ```

3. **Restart the server:**
   ```bash
   npm run dev
   ```

### Technical Details

- **Model:** `gpt-4o-mini` (cost-effective, fast)
- **API Endpoint:** OpenAI's Chat Completions API
- **Summary Format:** 3-6 bullet points
- **Error Handling:** Comprehensive error messages with status codes

### Assumptions
- Text summaries are returned as bullet points
- Minimum text length: 50 characters
- Maximum text length: 10,000 characters
- Rate limiting depends on OpenAI API quota
- Service errors return descriptive messages

---

## Error Handling

All endpoints return structured error responses:

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes
- **200:** Success
- **201:** Created
- **400:** Bad Request (validation error)
- **401:** Unauthorized (missing/invalid token)
- **403:** Forbidden (role-based access denied)
- **404:** Not Found
- **500:** Internal Server Error
- **502:** Bad Gateway (LLM service error)

---

## Security Practices

✅ **Implemented:**
- JWT tokens instead of sessions
- Password hashing with bcryptjs (10 salt rounds)
- Role-based access control (RBAC)
- Environment variables for sensitive data
- Input validation on all endpoints
- Error messages don't leak sensitive info
- Required fields in all schemas
- API key in environment variables (not hardcoded)

✅ **Additional Recommendations for Production:**
- Use HTTPS/SSL
- Implement rate limiting
- Add CORS configuration
- Use MongoDB Atlas for database
- Implement logging and monitoring
- Add request validation middleware
- Use helmet for HTTP headers security

---

## Database Schema

### User
```
{
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  role: String (required, enum: ["parent", "mentor"])
  createdAt: Date
  updatedAt: Date
}
```

### Student
```
{
  name: String (required, min 2 chars)
  age: Number (required, 5-25)
  parentId: ObjectId (required, ref: User)
  createdAt: Date
  updatedAt: Date
}
```

### Lesson
```
{
  title: String (required, min 3 chars)
  description: String (required, min 10 chars)
  mentorId: ObjectId (required, ref: User)
  createdAt: Date
  updatedAt: Date
}
```

### Booking
```
{
  studentId: ObjectId (required, ref: Student)
  lessonId: ObjectId (required, ref: Lesson)
  parentId: ObjectId (required, ref: User)
  createdAt: Date
  updatedAt: Date
}
```

### Session
```
{
  lessonId: ObjectId (required, ref: Lesson)
  date: Date (required)
  topic: String (required, min 3 chars)
  summary: String (required, min 10 chars)
  createdAt: Date
  updatedAt: Date
}
```

---

## Project Structure

```
mentorship-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── studentController.js  # Student CRUD
│   ├── lessonController.js   # Lesson CRUD
│   ├── bookingController.js  # Booking CRUD
│   ├── sessionController.js  # Session CRUD
│   └── llmController.js      # LLM summarization
├── middleware/
│   └── authMiddleware.js     # JWT verification
├── models/
│   ├── User.js               # User schema
│   ├── Student.js            # Student schema
│   ├── Lesson.js             # Lesson schema
│   ├── Booking.js            # Booking schema
│   └── Session.js            # Session schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── studentRoutes.js      # Student endpoints
│   ├── lessonRoutes.js       # Lesson endpoints
│   ├── bookingRoutes.js      # Booking endpoints
│   ├── sessionRoutes.js      # Session endpoints
│   └── llmRoutes.js          # LLM endpoints
├── utils/
│   └── generateToken.js      # JWT generation
├── server.js                 # Express app setup
├── package.json              # Dependencies
├── .env                      # Environment variables
└── README.md                 # This file
```

---

## Testing

### Test Signup
```bash
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Mentor",
    "email": "mentor@example.com",
    "password": "password123",
    "role": "mentor"
  }'
```

### Test Create Lesson (with token)
```bash
curl -X POST http://localhost:5000/lessons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "title": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals including ES6 syntax and asynchronous programming"
  }'
```

---

## Support

For issues or questions:
1. Check environment variables are set correctly
2. Verify MongoDB connection
3. Check OpenAI API key and quota
4. Review server logs for detailed error messages

---

## License

MIT License - Free to use and modify.
