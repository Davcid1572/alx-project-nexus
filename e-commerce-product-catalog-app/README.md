# 🛒 Modern E-Commerce Web Application

A modern, scalable e-commerce web application built with **Next.js**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.  
This project demonstrates real-world frontend engineering practices, including API integration, global state management, responsive UI design, and performance considerations.

---

## 🚀 Live Demo

> _http://alx-project-nexus-two-beta.vercel.app/_

---

## 📌 Project Overview

This project simulates a real-world e-commerce platform where users can:

- Browse products fetched from an external API
- Filter products by category
- Search for products globally
- Sort products by price
- Add and remove items from a shopping cart
- View cart quantity updates in real time

The goal is to showcase clean architecture, scalability, and best practices in modern frontend development.

---

## ✨ Features

- 🛍️ Product listing from **FakeStore API**
- 🗂️ Category-based filtering
- 🔍 Global product search (header search)
- ↕️ Price sorting (Low → High, High → Low)
- 🛒 Add to cart / remove from cart
- 🔢 Dynamic cart count in header
- 📱 Fully responsive UI (mobile & desktop)
- ⏳ Loading skeletons & error handling
- 🧠 Centralized state management with Redux

---

## 🧭 User Flow

1. User lands on the homepage
2. Views promotional banner and categories
3. Navigates to the products page
4. Filters products by category
5. Searches products using the header search
6. Sorts products by price
7. Adds products to cart
8. Cart updates instantly across the app

---

## 🛠️ Technologies Used

- **Next.js** — React framework for routing and performance
- **React** — Component-based UI development
- **TypeScript** — Static typing for reliability and maintainability
- **Redux Toolkit** — Global state management
- **Tailwind CSS** — Utility-first styling
- **FakeStore API** — External product data source
- **Git & GitHub** — Version control

---

## 🧠 State Management

Redux Toolkit is used to manage global state such as:

- Products
- Categories
- Selected category
- Search query
- Cart items and quantities

This ensures predictable state updates, scalability, and easier debugging.

---

## 📁 Project Structure

```txt
├── public/
│   └── assets/
│       ├── images/
│       └── fonts/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── ProductCard.tsx
│   └── Categories.tsx
│
├── pages/
│   ├── api/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── products/
│   └── cart/
│
├── utils/
│   ├── api.ts
│   ├── constants.ts
│   ├── helpers.ts
│   └── store/
│       ├── hooks.ts
│       └── slices/
│           ├── productsSlice.ts
│           └── cartSlice.ts
│
├── interfaces/
│   └── index.ts
│
├── styles/
│   ├── globals.css
│   └── tailwind.css
│
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```
