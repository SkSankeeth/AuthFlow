# 🔐 AuthFlow – Modern Login & Registration System

> A sleek, full-stack authentication system built with React, Node.js, Express & MongoDB, featuring JWT-based authentication, secure password handling, and premium UI/UX design.

---

## 📌 Project Overview

**AuthFlow** is a production-ready full-stack authentication system designed to demonstrate expertise in secure user management, JWT-based session handling, and modern responsive UI design.

Built using the **MERN** stack (MongoDB, Express.js, React, Node.js), this project is ideal for portfolio demonstration, internship applications, and showcasing full-stack capabilities.

---

## 🚀 Features

### 🧑‍💻 User Features
- ✅ User Registration – Unique username & email validation with secure password hashing
- 🔐 User Login – Password verification with bcryptjs
- 📄 JWT-Based Authentication – Stateless token-based sessions
- 🚫 Protected Routes – Middleware secured access

### 🎨 UI/UX Highlights
- 🔄 3D Card Flip Animation
- 🌈 Dynamic Background (pulsing gradient)
- 🧊 Floating Card with glassmorphism
- ✨ Animated Title Branding
- 💬 Success/Error Message Popups
- 🔘 Interactive Buttons & Input Fields

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

---

## 🧪 Getting Started

### 🔧 Prerequisites
- Node.js (v14+)
- npm (comes with Node)
- MongoDB Atlas (free tier)

---

### 📦 1. Backend Setup

```bash
git clone https://github.com/SkSankeeth/AuthFlow.git
cd AuthFlow/authflow-backend
npm install
```

#### 🔐 Environment Setup

Create a `.env` file in `authflow-backend/`:

```
MONGO_URI=mongodb+srv://authuser:12345@authflowcluster.vwnoxym.mongodb.net/authflow_db?retryWrites=true&w=majority&appName=AuthFlowCluster
JWT_SECRET=somereallylongandcomplexsecretkeyforjwt
PORT=5000
```

#### ▶️ Start Backend Server

```bash
npm start
```

---

### 🎨 2. Frontend Setup

```bash
cd ../authflow-frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## ⚙️ Project Structure

```
AuthFlow/
├── authflow-backend/
│   ├── config/              # MongoDB connection
│   ├── middleware/          # JWT middleware
│   ├── models/              # User model schema
│   ├── routes/              # Auth routes
│   └── server.js            # Express server logic
├── authflow-frontend/
│   ├── components/          # Login, Signup, Protected views
│   ├── index.css            # Tailwind setup
│   └── App.js               # App router
├── README.md
└── .gitignore
```

---

## 💡 Usage

### 👤 Sign Up
- Go to **Sign Up** tab
- Enter username, email & password
- JWT token saved to localStorage upon success

### 🔐 Login
- Go to **Login** tab
- Enter registered email & password
- If valid, redirects to protected page

### 🔓 Logout
- Click **Logout** to clear JWT and return to login screen

---

## 🌐 Live Demo (Add these after deployment)

- 🔗 [Frontend on Vercel](https://auth-flow-coral.vercel.app/)
- 🔗 [Backend on Render](https://your-backend-link.onrender.com)

---

## 🧾 License

This project is licensed under the MIT License.  
See `LICENSE.md` for more details.

---

## 🤝 Let's Connect

Made with ❤️ by Sankeeth Sithamparanathan  
🔗 [LinkedIn](www.linkedin.com/in/sankeeth-sithamparanathan-83765a30a)  
⭐ If you like this project, drop a star!
