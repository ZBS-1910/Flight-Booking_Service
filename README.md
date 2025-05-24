
## 🛫 Flight Booking Service


## 🚀 Overview

The Flight Booking Service is a microservice responsible for handling all flight reservation operations in our airline management system. It provides a secure, scalable, and efficient way to manage flight bookings, passenger information, and payment processing.


## 🚀 Project Setup

Follow the steps below to set up and run the project locally:

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/ZBS-1910/Flight-Booking_Service.git
cd Flights-Service-master
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
    "password": null, //mySQL_password
    "database": "database_development", //mySQL_DB_NAME
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
cd src
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
Server started at PORT 3002
```

Visit `http://localhost:3000` (or your selected port) to start using the API.
## 📝 API Documentation

### Base URL
- Development: `http://localhost:3002`
- API Gateway: `http://localhost:3000`

### Available Endpoints

#### v1 API

| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/v1/info`                | Service info/health check        |
| POST   | `/api/v1/bookings`            | Create a new booking             |
| POST   | `/api/v1/bookings/payments`   | Make payment for a booking       |

#### v2 API

| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/v2/info`                | v2 info/test endpoint            |

---

### Example: Health Check

```bash
curl http://localhost:3000/api/v1/info
```

**Response:**
```json
{
  "success": true,
  "message": "Booking service API is live",
  "error": {},
  "data": {}
}
```
## 👤 Author

- **Name**: Zameer Basha S 
- **GitHub**: [ZBS-1910](https://github.com/ZBS-1910)  
- **Email**: zameer1910basha@gmail.com 
