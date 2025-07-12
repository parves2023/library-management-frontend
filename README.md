# 📚 Library Management System

A minimal full-stack library management system built with **React**, **Redux Toolkit Query**, **TypeScript**, and **Mongoose + Express** backend. This project demonstrates essential book and borrowing operations without authentication, filtering, or payment systems.

### 🔗 Live Links

* 🖥️ **Frontend**: [library-frontend-liard.vercel.app](https://library-frontend-liard.vercel.app)
* 🛠️ **Backend**: [l2-libary-asignment-03-pearl.vercel.app](https://l2-libary-asignment-03-pearl.vercel.app)

---

## 🧠 Project Overview

This application allows users to:

* View a list of all books
* Perform CRUD operations on books
* Borrow books and submit borrowing data
* View a simple **borrow summary** with total quantity borrowed

All functionalities are **public**—no login/authentication required.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Redux Toolkit (RTK Query)
* Tailwind CSS
* Shadcn/UI (optional UI library)

### Backend

* Node.js + Express
* MongoDB + Mongoose
* TypeScript

---

## ✨ Features

### 1. 📖 Book Management

* **List Books**: All books displayed in a table format.
* **Columns**: Title, Author, Genre, ISBN, Copies, Availability, Actions.
* **Edit Book**: Opens form with pre-filled data. On submit, updates book.
* **Delete Book**: Shows confirmation before deletion.
* **Add New Book**: Opens form with required fields:

  * Title, Author, Genre, ISBN, Description, Copies

✅ Business Logic:

* If `copies = 0`, the book is marked as **Unavailable**.
* UI updates immediately on all changes via RTK Query cache invalidation.

### 2. 📥 Borrow Book

* **Borrow Action**: Opens form from the book list.
* **Form Fields**:

  * Quantity (must be ≤ available copies)
  * Due Date
* On successful borrow:

  * Book copies are reduced.
  * If copies reach 0, marked unavailable.
  * Redirects to Borrow Summary.

### 3. 📊 Borrow Summary

* Aggregated list of borrowed books.
* **Columns**: Book Title, ISBN, Total Quantity Borrowed.
* Data retrieved via a custom aggregation API.

---

## 📁 Project Structure

```
📦 library-management-frontend
├── 📂 components
├── 📂 features (Redux API Slices)
├── 📂 pages
│   ├── books
│   ├── create-book
│   ├── edit-book
│   ├── borrow-summary
│   └── borrow
├── 📂 types
├── 📂 utils
├── App.tsx
└── main.tsx
```

---

## 🔄 API Endpoints (from backend)

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/books`          | Get all books              |
| GET    | `/api/books/:id`      | Get single book            |
| POST   | `/api/books`          | Add a new book             |
| PATCH  | `/api/books/:id`      | Update a book              |
| DELETE | `/api/books/:id`      | Delete a book              |
| POST   | `/api/borrow`         | Borrow a book              |
| GET    | `/api/borrow-summary` | Get total borrowed summary |

---

## 🔄 Pages & Routes

| Route             | Purpose                           |
| ----------------- | --------------------------------- |
| `/books`          | Show all books with actions       |
| `/create-book`    | Add a new book                    |
| `/edit-book/:id`  | Edit selected book                |
| `/books/:id`      | View book details (optional)      |
| `/borrow/:bookId` | Borrow form for the selected book |
| `/borrow-summary` | Show summary of borrowed books    |

---

## 🧪 Installation & Setup

### 🔹 Frontend

```bash
git clone https://github.com/parves2023/library-management-frontend.git
cd library-management-frontend
npm install
npm run dev
```

### 🔹 Backend

```bash
git clone https://github.com/parves2023/Mongoose-typescript-mvc.git
cd Mongoose-typescript-mvc
npm install
npm run dev
```

Make sure you have a `.env` file with MongoDB URI:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🧠 Developer Notes

* Uses **RTK Query** for efficient API state management.
* Clean and modular component structure.
* No authentication or user system—fully public CRUD interface.

---

## 📌 Future Enhancements (Optional Ideas)

* Add user authentication & roles (admin vs borrower)
* Implement search and category filtering
* Add pagination and sorting to book table
* Add overdue date alerts or email reminders
* Upload book cover images via Cloudinary or similar

---

## 🙌 Credits

Developed by **[Parves Mosarof](https://github.com/parves2023)**
Project inspired by Programming Hero Level 2 Assignment
Designed with simplicity and functionality in mind.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---