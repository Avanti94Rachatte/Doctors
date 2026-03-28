Backend: https://doctors-backend-m62r.onrender.com/
frontend: https://doctors-frontend-8l90.onrender.com/
admin: https://doctors-admin-f2rv.onrender.com/


<img width="1897" height="992" alt="Screenshot 2026-03-28 174131" src="https://github.com/user-attachments/assets/6a23a6de-8c04-4434-b1fc-68f9728ee1c9" />
<img width="1683" height="932" alt="Screenshot 2026-03-28 174419" src="https://github.com/user-attachments/assets/e9ee6f41-f0cf-4de5-bb93-b5bec44b640d" />


# 🏥 Doctor Appointment App

## 📌 Overview

The Doctor Appointment App is a full-stack web application that allows users to book appointments with doctors online. It simplifies the traditional appointment process by providing a digital platform for patients, doctors, and administrators.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* View list of doctors
* Book appointment slots
* Cancel appointments
* View appointment history

### 👨‍⚕️ Doctor Features

* Apply as a doctor
* Manage availability
* View booked appointments

### 🛠 Admin Features

* Approve or reject doctor applications
* Manage users and doctors
* View all appointments
* Monitor system activities

---

## 🧱 Tech Stack

### Frontend:

* React.js
* Tailwind CSS / CSS

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB

### Authentication:

* JWT (JSON Web Token)

---

## 🏗 Architecture

The application follows a modular architecture with:

* Frontend (User Interface)
* Backend (API & Business Logic)
* Database (MongoDB)

---

## 🌐 Deployment

* Frontend: Render
* Backend: Render
* Admin Panel: Render

---

## 📂 Project Structure

```
Doctors/
 ├── frontend/
 ├── backend/
 ├── admin/
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
JWT_SECRET=your_secret_key
MONGO_URI=your_database_url
```

---

## ⚙️ Installation

```bash
git clone https://github.com/Avanti94Rachatte/Doctors.git
cd Doctors

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
cd ../admin && npm install

# Run project
npm run dev


## 👩‍💻 Author

Avanti Rachatte

---

## ⭐ Acknowledgment

This project demonstrates a real-world MERN stack application for healthcare management.
