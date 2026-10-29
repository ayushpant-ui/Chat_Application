<h1 align="center">Chat Application 💬</h1>

<p align="center">
  A real-time private messaging app built with Next.js, NestJS, PostgreSQL and WebSockets.
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-in%20development-orange" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" />
</p>

---

<p align="center">
  <img src="./frontend/public/images/ChatApp-Demo.png" alt="Chat application demo" width="100%" />
</p>

---

## Overview

This application lets registered users hold private, one-to-one conversations that are delivered instantly over WebSockets. Accounts are protected with JWT authentication, and users, conversations and messages are stored in PostgreSQL through Prisma.

## Features and Status

✅ Done &nbsp;·&nbsp; 🚧 In progress &nbsp;·&nbsp; 📋 Planned

| Feature | Status |
| --- | :---: |
| Responsive chat interface | 🚧 |
| User registration and login pages | 🚧 |
| Secure authentication with JWT | 📋 |
| Private one-to-one conversations | 📋 |
| Real-time messaging with WebSockets | 📋 |
| Message history and conversation management | 📋 |
| Online / offline status | 📋 |
| Typing indicators | 📋 |

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | Next.js | Framework and routing |
| | React | UI components |
| | TypeScript | Type safety |
| | Tailwind CSS | Styling and theming |
| **Backend** | NestJS (Node.js) | Modular server application |
| | TypeScript | Type safety |
| | REST APIs | Authentication and data endpoints |
| | Socket.IO | Real-time messaging |
| **Database** | PostgreSQL | Relational data store |
| | Prisma ORM | Type-safe queries and migrations |
| **Authentication** | JSON Web Tokens (JWT) | Stateless user authentication |
| **Tools** | Git and GitHub | Version control |
| | Postman | API testing |
| | pgAdmin | Database management |

## Architecture

The application follows a client-server architecture.

```mermaid
flowchart LR
    Client["Next.js client"] -- "REST (auth, history)" --> API
    Client <-- "WebSocket (live messages)" --> Gateway

    subgraph Backend["NestJS backend"]
        API["REST API"]
        Gateway["Socket.IO gateway"]
    end

    API --> DB[("PostgreSQL via Prisma")]
    Gateway --> DB
```

1. **Frontend:** Next.js provides the user interface.
2. **Backend:** NestJS handles business logic, authentication and API requests.
3. **Database:** PostgreSQL stores users, conversations and messages.
4. **ORM:** Prisma manages communication between the backend and the database.
5. **Real-time layer:** Socket.IO delivers messages instantly between connected users.

## Getting Started

### Prerequisites

- Node.js 20 or later
- PostgreSQL
- npm and Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ChatApp
```

### 2. Backend

Create a database named `chatapp_db` in PostgreSQL, then:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/chatapp_db"
JWT_SECRET="replace-with-a-long-random-secret"
PORT=5000
```

Run the migrations and start the server:

```bash
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

### 3. Frontend

In a new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
<!-- NEXT_PUBLIC_SOCKET_URL="http://localhost:5000" -->
```

```bash
npm run dev
```

Open the address printed by Next.js (for example `http://localhost:3001`).

## Project Structure

```text
ChatApp/
├── frontend/       # Next.js frontend
├── backend/        # NestJS backend
│   ├── prisma/     # Database schema and migrations
│   └── src/        # Backend modules and services
├── .gitignore
└── README.md
```

## Future Improvements

- Group conversations
- Image and file sharing
- Message delivery and read receipts
- Push notifications
- Message editing and deletion
- End-to-end encryption

## Author

**Ayush Pant**

## License

This project is developed for educational purposes and practical learning in full-stack and backend engineering.