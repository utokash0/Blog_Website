
## 📝 Project Title: Full Stack Blog Website with Authentication and MongoDB

---

## 🚀 Project Overview:

This is a full-stack blog website where users can **sign up**, **log in**, **create blogs**, **view blogs**, and **post comments**. The project includes **user authentication with hashed passwords and JWT tokens**, secure blog creation, and storage/retrieval of all data using **MongoDB**.

---

## 🔧 Key Features & Steps

### 1. **User Registration & Authentication**

* New users can register by providing their **name, email, password, and profile image (optional)**.
* Before saving to the database, the password is **hashed using HMAC-SHA256 with a random salt** to improve security.
* A **JWT (JSON Web Token)** is generated for each authenticated user.
* The JWT contains a unique user ID and is used to **verify login sessions** securely.

### 2. **User Login**

* During login, the email is used to find the user in the database.
* The provided password is hashed using the stored salt and matched against the hashed password.
* If the credentials match, a new **JWT token is issued**, allowing the user to access protected routes.

### 3. **MongoDB Integration**

* The backend is connected to **MongoDB**, where all user data, blogs, and comments are stored.
* Mongoose is used to define schemas and models for:

  * Users
  * Blogs
  * Comments

### 4. **Blog Creation**

* Logged-in users can create new blogs through a form.
* Each blog contains a **title**, **body**, and optional **cover image**.
* The blog is linked to the user who created it via a `createdBy` reference.

### 5. **Dynamic Blog Viewing**

* Blogs can be accessed via a unique URL:

  ```
  /blog/:blogId
  ```
* This route fetches a specific blog from the database using the blog ID and displays its full content.

### 6. **User Profile & Display**

* Each blog and comment displays the **user's name and profile image**.
* This is done by using Mongoose’s `.populate()` method to fetch full user details from the user ID reference.

### 7. **Comment System**

* Logged-in users can post comments on any blog.
* Comments are also stored in MongoDB and associated with both the blog and the commenting user.

---

## 🛡️ Security Measures

* Passwords are **never stored as plain text**.
* Authentication is handled using **JWT tokens stored in HTTP-only cookies**.
* Routes that allow adding or modifying blogs/comments are **protected**, and only authenticated users can access them.

---

## 🧱 Tech Stack

* **Frontend**: EJS Templates + Bootstrap
* **Backend**: Node.js + Express.js
* **Database**: MongoDB with Mongoose
* **Authentication**: JWT (JSON Web Tokens)
* **Password Security**: `crypto` module with HMAC-SHA256 + Salt

---

## ✅ Conclusion

This project is a **complete blog platform** with user registration, authentication, content creation, and dynamic routing. It demonstrates how a secure, real-world application works using **Node.js, Express, MongoDB, JWT, and EJS**.

It’s ideal for understanding the **full flow of user interaction**, from sign-up to content posting, all while maintaining **secure practices** and **modular code**.


