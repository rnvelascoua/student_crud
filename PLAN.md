# Student CRUD Application - Project Context & Implementation Plan

## 1. Project Overview
This project is a full-stack student management application. The backend is a Spring Boot service connected to PostgreSQL, and the frontend is built using **Vite + React (JavaScript)** styled with **Tailwind CSS**.

### Requirements Fulfilled:
* **Tailwind CSS**: Full utility-first modern styling with cards, responsive grid, status badges, and interactive focus states.
* **Strictly No Modals**:
  * **Create / Update**: Handled via an embedded, persistent side-by-side card (`StudentFormPanel.jsx`) that toggles seamlessly between Add and Edit mode with an explicit "Cancel" button.
  * **Delete**: Handled via row-level inline confirmations (`StudentRow.jsx`) where clicking "Delete" transforms the action buttons directly on the row into `[Confirm]` and `[Cancel]`.
  * **Feedback Alerts**: Non-blocking toast alerts (`ToastNotification.jsx`) at the bottom right.

---

## 2. Backend API Contract

* **Base URL**: `http://localhost:8080`
* **Controller Path**: `/velasco/students`
* **Live Test Status**: Verified live and responding with existing database records.
* **Entity Fields**:
  | Field | Type | Description |
  | :--- | :--- | :--- |
  | `id` | `Integer` | Auto-generated primary key |
  | `firstname` | `String` | First name of the student |
  | `lastname` | `String` | Last name of the student |
  | `course` | `String` | Degree / Academic program (e.g., IT, BSCS) |
  | `section` | `String` | Class section (e.g., 3A, 2A) |

### Endpoints
* **`GET /velasco/students`**: Retrieves all student records (`200 OK`).
* **`GET /velasco/students/{id}`**: Retrieves a single student by ID (`200 OK` or `404 Not Found`).
* **`POST /velasco/students`**: Creates a student record (`201 Created`).
* **`PUT /velasco/students/{id}`**: Updates an existing student record (`200 OK` or `404 Not Found`).
* **`DELETE /velasco/students/{id}`**: Deletes a student record (`200 OK` or `404 Not Found`).

---

## 3. Frontend Architecture

### Location:
`frontend/`

### Project Structure:
```text
frontend/
├── index.html                       # HTML root with responsive viewport
├── package.json                     # Dependencies: React 19, Vite, Tailwind CSS v4, Lucide React
├── vite.config.js                   # Configured with @tailwindcss/vite and /velasco proxy
└── src/
    ├── index.css                    # Tailwind CSS import
    ├── main.jsx                     # Root React mount
    ├── App.jsx                      # Main dashboard orchestrator
    ├── services/
    │   └── studentService.js        # REST client with full CRUD operations
    └── components/
        ├── Header.jsx               # Navigation bar & branding
        ├── StudentFormPanel.jsx     # Embedded form card (Create / Edit toggle)
        ├── StudentTable.jsx         # Table view with search, filter & refresh
        ├── StudentRow.jsx           # Individual row with inline delete confirmation
        └── ToastNotification.jsx    # Toast notification for success / error alerts
```

---

## 4. Completed Implementation Phases

* [x] **Phase 1: Project Scaffolding & Tailwind Setup**
  * Scaffolded Vite React project in `frontend/`.
  * Installed `tailwindcss`, `@tailwindcss/vite`, and `lucide-react`.
  * Configured `vite.config.js` with proxy to `http://localhost:8080`.
* [x] **Phase 2: Service Layer (`src/services/studentService.js`)**
  * Implemented `getAllStudents()`, `getStudentById()`, `createStudent()`, `updateStudent()`, and `deleteStudent()`.
* [x] **Phase 3: Component Implementation (Strictly No Modals)**
  * `Header.jsx`: Title, branding, and quick reset.
  * `StudentFormPanel.jsx`: Embedded card supporting both Add and Edit modes with full validation.
  * `StudentRow.jsx`: Row layout with inline confirm/cancel deletion.
  * `StudentTable.jsx`: Filter by course, live search by name/course/ID, and auto-count.
  * `ToastNotification.jsx`: Non-blocking floating status alerts.
* [x] **Phase 4: State & Data Flow (`App.jsx`)**
  * Connected all states, asynchronous calls, error traps, and toasts.
* [x] **Phase 5: Build Verification**
  * Production build compiled successfully (`npm run build`).

---

## 5. How to Run the Application

1. **Backend** (Spring Boot):
   ```bash
   cd student
   ./mvnw spring-boot:run
   ```
2. **Frontend** (Vite React):
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:3000` (or the port Vite outputs) in your browser.
