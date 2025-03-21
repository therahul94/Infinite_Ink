# 🖋️ Infinite Ink – Blog Website

A **full-stack** blog platform, featuring **JWT authentication**, **rich-text editing (Quill Editor)**, and **CRUD operations** for seamless content management. The backend is deployed on **Cloudflare Workers**, and the frontend on **Vercel**, ensuring a **fast, serverless experience**. Includes a **shared npm package** with **Zod schemas** for type safety across frontend and backend.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Performance Optimizations](#-performance-optimizations)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Usage](#-usage)


## ✨ Features

✅ Secure **JWT authentication** for user login/signup  
✅ **Rich-text editor** (Quill) for writing blogs in a customizable way  
✅ **CRUD operations** – Create, Read, Update, Delete blogs  
✅ **Serverless backend** hosted on **Cloudflare Workers**  
✅ **Frontend hosted on Vercel** for fast performance  
✅ **Zod validation schemas** in a shared npm package for type safety  
✅ **Optimized state management** using custom React hooks  
✅ **SEO-friendly URLs** for better search engine visibility  
✅ **PostgreSQL with Prisma ORM** for structured and scalable data storage  
✅ **Connection pooling via Prisma Accelerate** for efficient database access in a **serverless environment**  


## 🛠 Tech Stack

### 🌐 Frontend
- React.js
- TypeScript
- Tailwind CSS
- Quill Editor

### 🖥️ Backend
- Node.js
- Hono Framework
- Cloudflare Workers
- Zod for validation
- JWT Authentication
- **PostgreSQL with Prisma Accelerate for connection pooling**

### 🗄️ Database
- **PostgreSQL** (with Prisma ORM & Prisma Accelerate)

### 🛠 DevOps & Deployment
- Vercel (Frontend)
- Cloudflare Workers (Backend)
- **Prisma Accelerate** for database connection pooling


## ⚡ Performance Optimizations

- **Prisma Accelerate** enabled for **connection pooling**, reducing query latency and ensuring **efficient PostgreSQL connections** in a **serverless setup**.  
- **Optimized Prisma queries** to improve read/write efficiency.  
- **Lazy loading and memoization** to reduce frontend rendering times.  



## 🔧 Installation

Clone the repository:

```sh
git clone https://github.com/yourusername/infinite-ink.git
cd infinite-ink
```

## 🗄️ Database Setup

1. Set up **PostgreSQL** (local or cloud-based like Supabase, Railway, or AWS RDS).
2. Configure **Prisma ORM**:
   
   ```sh
    npx prisma init
    DATABASE_URL="prisma://your-prisma-accelerate-url"
    npx prisma migrate dev --name init
    ```
### Run Backend locally
cd backend
npm install
npm run dev

### Run Frontend locally
cd frontend
npm install
npm run dev

## 🚀 Usage

1️⃣ Sign up and log in with JWT authentication.  
2️⃣ Create, edit, and delete blog posts using the **Quill rich-text editor**.  
3️⃣ View published blogs with SEO-friendly URLs.  
4️⃣ Secure access with **role-based authentication**.  
