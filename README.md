# ✈️ Flight Booking Service

## 🛫 Description

The Flight Booking Service is a backend application designed to manage flight reservations efficiently. It provides a robust API for handling operations such as searching for flights, booking tickets, and managing user data. Built with scalability and maintainability in mind, this service is ideal for integration into larger airline or travel management systems. Its modular design ensures ease of development and future enhancements.

## ✅ Features

This project includes the following features:

- **RESTful API**: Follows standard API practices using HTTP methods for resources (flights, bookings, etc.).
- **Modular Structure**: Clean folder architecture for scalability and maintainability.
- **Environment-based Configuration**: Uses `.env` and `config.json` for different environments (dev, test, prod).
- **Database Integration**: Seamlessly integrates with MySQL via Sequelize ORM.
- **Middleware Support**: Includes validators and authenticators for secured and valid request processing.
- **Error Handling & Logging**: Structured error messages and logging setup (e.g., for debugging and monitoring).
- **Extensible Design**: Easy to add new services or features with minimal restructuring.

## 🔧 Prerequisites

Make sure you have the following installed before setting up the project:

- **Node.js** (v14 or higher)
- **MySQL** (or any SQL dialect supported by Sequelize)

### Additional Tools

- **Git**: For version control and repository management.
- **Postman or cURL**: To test API endpoints during development.
- **A code editor like VS Code**: For efficient coding and debugging.
- **Sequelize CLI**: To manage database migrations and seeders.
- **Docker (optional)**: For containerized deployment and testing.

## 📁 Folder Structure

Here's how the project is structured under the `src/` directory:

```
src/
│
├── config/         # Handles third-party configuration (e.g., dotenv, Sequelize, logging)
├── routes/         # Maps endpoints (URLs) to controllers via Express routers
├── middlewares/    # Functions that run before controllers (e.g., validation, auth checks)
├── controllers/    # Request handlers - extract data, call service, return response
├── repositories/   # Direct DB access logic (raw SQL or ORM queries)
├── services/       # Main business logic (e.g., pricing calculation, seat availability)
└── utils/          # Shared utility functions (e.g., error formatting, helpers)
```

## 🚀 Project Setup

Follow the steps below to set up and run the project locally:

### 1. Clone and Install Dependencies

```bash
git clone <your_repo_url>
cd <repo_name>
npm install
```

### 2. Create `.env` File

In the root directory, create a `.env` file to store your environment variables:

```env
PORT=4000
```

You can choose any port that is free on your system.

### 3. Set Up Database Configuration

Inside `src/config`, create a file named `config.json` and add:

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

✅ Replace `username`, `password`, and `database` fields as per your local or hosted DB setup.

### 4. Initialize Sequelize

This sets up Sequelize folders and config files:

```bash
npx sequelize init
```

You’ll now see:

- `migrations/`
- `seeders/`
- Updated `config/config.json`

### 5. Run Database Migrations

Apply the DB schema by running:

```bash
npx sequelize db:migrate
```

### 6. Start the Server

Launch the backend service:

```bash
npm run dev
```

You should see:

```bash
Server started at PORT 4000
```

Visit `http://localhost:4000` (or your selected port) to start using the API.

---

Let me know if you want this as a downloadable `.md` file, or if you'd like to add:

- API documentation with Swagger/Postman
- Sample API responses
- Authentication flow details
- Contribution guidelines

I'm happy to help you make it more production-ready!
