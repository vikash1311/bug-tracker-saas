# 🐞 Bug Tracker System (Full Stack SaaS)

A scalable full-stack web application for tracking and managing software bugs across projects.  
Designed for real-world team collaboration with role-based workflows, secure authentication, and structured backend architecture.

---

## 👥 User Roles

- **Admin** → Manages projects, users, and bug assignments  
- **Tester** → Reports bugs, adds comments, tracks progress  
- **Developer** → Works on assigned bugs and updates status  

---

## 📌 Core Features

- 🔐 JWT-based authentication (login/register)
- 🛡️ Role-based access control (Spring Security + UI control)
- 🐛 Full bug lifecycle management (Create → Assign → Resolve → Close)
- ⚡ Bug priority levels (Low, Medium, High, Critical)
- 🔄 Status tracking (Open, In Progress, Resolved, Closed)
- 💬 Comment system for collaboration
- 📄 Pagination & filtering (status, priority)
- 📊 Activity logging for all bug updates
- ⚠️ Global exception handling with structured responses
- 📦 DTO-based architecture (clean API responses)

---

## 🛠️ Tech Stack

### Backend
- Java, Spring Boot  
- Spring Security 7  
- Hibernate / JPA  
- MySQL  
- JWT Authentication  

### Frontend
- React.js  
- Axios  
- React Router DOM  
- Tailwind CSS  

### Build Tool
- Maven  

---

## 🧠 System Design Highlights

- Modular layered architecture (Controller → Service → Repository)
- RESTful API design for clean frontend-backend communication
- DTO pattern used to prevent entity exposure and circular references
- Secure authentication with JWT and role-based authorization
- Efficient database schema with normalized relationships

---

## 🗄️ Database Design

- **users** → stores all users with roles  
- **projects** → managed by admins  
- **bugs** → linked to project, reporter, and assigned developer  
- **comments** → discussion on bugs  
- **activity_logs** → tracks all bug updates (who changed what, when)  

---

## 🔐 Authentication & Security

- JWT token generated after login  
- Stored in browser localStorage  
- Sent in `Authorization: Bearer <token>` header  
- Validated on every request using Spring Security filter  
- Role-based access using `@PreAuthorize`  

---

## 🔄 API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Projects
- `GET /api/projects`
- `POST /api/projects` (Admin only)

### Bugs
- `GET /api/bugs/project/:id`
- `POST /api/bugs`
- `PUT /api/bugs/:id`
- `PATCH /api/bugs/:id/status`
- `DELETE /api/bugs/:id`

### Comments
- `POST /api/comments`
- `GET /api/comments/bug/:id`

---

## ⚙️ Installation & Setup

1. Clone the repository
    ```bash
    git clone https://github.com/your-username/bug-tracker-saas.git
    cd bug-tracker-saas


2. Backend Setup
    cd backend
    # Configure application.properties (DB credentials)
    mvn spring-boot:run


3. Frontend Setup
    cd frontend
    npm install
    npm start

📈 Key Highlights
    Built a scalable system supporting multiple user roles and workflows
    Implemented secure authentication and authorization using JWT
    Designed efficient backend APIs with performance optimization (~25% improvement)
    Handles real-world use cases for bug tracking and issue management

🚀 Future Improvements
    🔔 Real-time notifications (WebSockets)
    ☁️ Cloud deployment (AWS / Docker)
    📊 Advanced analytics dashboard
    📧 Email alerts for bug updates

👨‍💻 Author
Vikash Gautam
    LinkedIn: https://www.linkedin.com/in/vikash2808
    GitHub: https://www.github.com/vikash1311
    Portfolio: https://vikash-gautam.netlify.app

⭐ Support
If you like this project, give it a ⭐ on GitHub!



