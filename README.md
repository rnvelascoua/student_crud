# Student CRUD Application

A full-stack Student Information Management System built with **Spring Boot** (Java) on the backend and **React** with **Vite** and **Tailwind CSS** on the frontend.

---

## 🚀 Tech Stack

* **Backend**:
  * Java 21 / Spring Boot 3
  * Spring Data JPA / Hibernate
  * PostgreSQL Database
  * Maven
* **Frontend**:
  * React 19
  * Vite
  * Tailwind CSS (v4)
  * Lucide React Icons
* **UX Design**:
  * Clean two-column responsive layout
  * **Strictly No Modals**: Embedded registration & edit card, inline row-level delete confirmations, and floating feedback toasts.

---

## 📁 Project Structure

```text
STUDENT-CRUD/
├── PLAN.md                     # Implementation plan & architecture notes
├── student/                    # Spring Boot backend
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/velasco/student/
│           │   ├── Student.java               # Entity
│           │   ├── StudentRepository.java     # JPA Repository
│           │   ├── StudentController.java     # REST Controller (/velasco/students)
│           │   └── StudentApplication.java    # Main Entry
│           └── resources/
│               └── application.properties     # DB & Hibernate config
└── frontend/                   # Vite + React frontend
    ├── vite.config.js          # Reverse proxy to http://localhost:8080
    └── src/
        ├── App.jsx             # Main dashboard
        ├── services/
        │   └── studentService.js # REST API client
        └── components/
            ├── Header.jsx
            ├── StudentFormPanel.jsx # Embedded Add/Edit form
            ├── StudentTable.jsx     # Directory with search & filters
            ├── StudentRow.jsx       # Row with inline delete confirmation
            └── ToastNotification.jsx # Feedback alerts
```

---

## 🛠️ Getting Started

### 1. Prerequisites
* **Node.js** (v18+ recommended)
* **Java JDK** (v17 or v21)
* **PostgreSQL** running locally with database `db_student`

### 2. Run the Backend (Spring Boot)
```bash
cd student
./mvnw spring-boot:run
```
*API Base Path: `http://localhost:8080/velasco/students`*

### 3. Run the Frontend (Vite React)
```bash
cd frontend
npm install
npm run dev
```
*Access the UI in your browser at `http://localhost:3000` (or the port specified by Vite).*
