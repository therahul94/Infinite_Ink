# 🖋️ Infinite Ink – Blog Website

A full-stack blog platform built with the **MERN stack**, featuring **JWT authentication**, **rich-text editing (Quill Editor)**, and **CRUD operations** for seamless content management. The backend is deployed on **Cloudflare Workers**, and the frontend on **Vercel**, ensuring a **fast, serverless experience**. Includes a **shared npm package** with **Zod schemas** for type safety across frontend and backend.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

✅ Secure **JWT authentication** for user login/signup  
✅ **Rich-text editor** (Quill) for writing blogs in a customizable way  
✅ **CRUD operations** – Create, Read, Update, Delete blogs  
✅ **Serverless backend** hosted on **Cloudflare Workers**  
✅ **Frontend hosted on Vercel** for fast performance  
✅ **Zod validation schemas** in a shared npm package for type safety  
✅ **Optimized state management** using custom React hooks  
✅ **SEO-friendly URLs** for better search engine visibility  

## 🛠 Tech Stack

### 🌐 Frontend
- React.js
- TypeScript
- Tailwind CSS
- Quill Editor

### 🖥️ Backend
- Node.js
- Express.js
- Cloudflare Workers
- Zod for validation
- JWT Authentication

### 🗄️ Database
- PostgreSQL (with Prisma ORM)

### 🛠 DevOps & Deployment
- Vercel (Frontend)
- Cloudflare Workers (Backend)
- PostgreSQL (Database)

## 🔧 Installation

Clone the repository:

```sh
git clone https://github.com/yourusername/infinite-ink.git
cd infinite-ink

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
