# Student CRUD Application

A full-stack Student Information Management System built with **Spring Boot** (Java) on the backend and **React** with **Vite** and **Tailwind CSS** on the frontend, ready for one-click deployment on **Render.com**.

---

## 🚀 Tech Stack

* **Backend**:
  * Java 21 / Spring Boot 3
  * Spring Data JPA / Hibernate
  * PostgreSQL Database
  * Multi-stage Docker build
* **Frontend**:
  * React 19
  * Vite
  * Tailwind CSS (v4)
  * Lucide React Icons
* **Deployment**:
  * Infrastructure as Code via `render.yaml` (Render Blueprint)
  * PostgreSQL database (`student-db`)
  * Containerized web service (`student-backend`)
  * Static site hosting with rewrite rules (`student-frontend`)

---

## ☁️ Deployment on Render.com (Blueprint)

This repository includes a [render.yaml](render.yaml) blueprint specification for automated full-stack deployment.

### Steps to Deploy:
1. Push your latest code to your GitHub repository ([`https://github.com/rnvelascoua/student_crud`](https://github.com/rnvelascoua/student_crud)).
2. Log in to [Render.com Dashboard](https://dashboard.render.com).
3. Click **New +** in the top right and select **Blueprint**.
4. Connect and select your **`student_crud`** repository.
5. Render will automatically parse `render.yaml` and propose provisioning:
   * **Database**: `student-db` (Free PostgreSQL instance)
   * **Backend**: `student-backend` (Docker container running Spring Boot on port 8080)
   * **Frontend**: `student-frontend` (Static site with SPA routing and API connection)
6. Click **Apply**. Render will automatically build the database, compile the Docker container, build the frontend, and link all environment variables.

---

## 💻 Local Development Setup

### 1. Prerequisites
* **Node.js** (v18+)
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
*Access the UI in your browser at `http://localhost:3000`.*
