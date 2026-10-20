# [Currently Working on it ]
# Chat Application 💬

<p align="center">
  <img
    src="./frontend/public/images/ChatApp-Demo.png"
    alt="Engineering College Management System Homepage"
    width="100%"
  />
</p>

A real-time chat application built with Next.js and NestJS that enables users to communicate through private messaging. It uses PostgreSQL and Prisma for data management, JWT for authentication, and WebSockets for instant message delivery.

## 🚀 Features

- User registration and login
- Secure authentication using JWT
- Real-time messaging using WebSockets
- Private conversations between users
- Message history and conversation management
- Online/offline user status
- Typing indicators
- Responsive user interface

## 🛠️ Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**
- NestJS
- Node.js
- TypeScript
- REST APIs
- Socket.IO

**Database & Authentication**
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT)

**Development Tools**
- Git and GitHub
- Postman
- pgAdmin

## 📁 Project Structure

```text
ChatApp/
├── frontend/       # Next.js frontend
├── backend/        # NestJS backend
│   ├── prisma/     # Database schema and migrations
│   └── src/        # Backend modules and services
├── .gitignore
└── README.md
```

<!-- ## ⚙️ Prerequisites

Before running the application, ensure you have installed:

- Node.js
- npm
- PostgreSQL
- Git -->

<!-- ## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ChatApp
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/chatapp_db"
JWT_SECRET="your-secret-key"
PORT=5000
```

Replace the database credentials with your local PostgreSQL configuration.

Create the database named `chatapp_db` in PostgreSQL before running the application.

Configure Prisma according to the version installed in your project, then run the required database migrations.

Start the backend:

```bash
npm run start:dev
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_SOCKET_URL="http://localhost:5000"
```

Start the frontend:

```bash
npm run dev
```

Open your browser and visit:

http://localhost:3001 -->

## 🔌 Application Architecture

The application follows a client-server architecture.

1. **Frontend:** Next.js provides the user interface.
2. **Backend:** NestJS handles business logic, authentication, and API requests.
3. **Database:** PostgreSQL stores users, conversations, and messages.
4. **ORM:** Prisma manages communication between the backend and database.
5. **Real-Time Communication:** Socket.IO enables instant messaging between connected users.

## 🔮 Future Improvements

- Group conversations
- Image and file sharing
- Message delivery and read receipts
- Push notifications
- Message editing and deletion
- End-to-end encryption

## 👨‍💻 Author

Ayush Pant

## 📄 License

This project is developed for educational purposes and practical learning in full-stack and backend engineering.