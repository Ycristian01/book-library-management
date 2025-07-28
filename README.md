# Library Management System

A full-stack web application for managing a library's book collection as part of the Software Engineer interview process with GML Software, built with React + TypeScript frontend and Java backend using Jakarta EE with Payara Micro.

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete books
- **Book Management**: Track title, author, publication year, and ISBN
- **Pagination**: Efficient browsing through large book collections
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Validation**: Form validation with user-friendly error messages
- **Modern UI**: Clean, intuitive interface using Material-UI components

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **Axios** for HTTP requests
- **Vite** for build tooling
- **Lucide React** for icons

### Backend
- **Java 17** with Jakarta EE
- **Payara Micro** application server
- **JPA/Hibernate** for ORM
- **PostgreSQL** database
- **JAX-RS** for REST API
- **Bean Validation** for data validation
- **Maven** for dependency management

### Infrastructure
- **Docker & Docker Compose** for containerization
- **PostgreSQL 16** database
- **Environment-based configuration**

## 📋 Prerequisites

Before running this application, make sure you have installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git** for cloning the repository

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd library-management-system
```

### 2. Download Payara Micro file

I used the Payara Micro 6.2025.7 (JAR) version during all the development. Add the .jar file to the backend root directory and change the name to *payara-micro.jar* so the dockerfile can run the command properly.

[payara.fish/downloads](https://www.payara.fish/downloads/payara-platform-community-edition/)

### 3. Environment Configuration (only local)

Create a `.env` file in the root directory:

```bash
# Database Configuration
POSTGRES_USER=libraryuser
POSTGRES_PASSWORD=librarypass
POSTGRES_DB=library
DB_HOST=postgres
DB_PORT=5432

# Application URLs
FRONTEND_URL=http://localhost:3000
```

Also add another `.env` file in the frontend root directory:

```bash
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Application

```bash
# Start all services
docker-compose up -d

# View logs (optional)
docker-compose logs -f
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/backend/api
- **Database**: localhost:5432 (PostgreSQL)

## 🛠️ Development Setup (In case of running without docker)

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
mvn clean package
java -jar payara-micro.jar --deploy target/backend.war
```

Also you can execute the `deploy.sh` file in the backend root directory.

_*Disclaimer:* I strongly recommend to run the backend with the docker container or you will need to change the `glassfish-resources.xml` values manually acording to your environment setup._

### Database Setup

The PostgreSQL database will be automatically initialized when starting with Docker Compose. Also run the `initialize-books.sql` queries to create the books table and add some test data.

## 📁 Project Structure

```
book-library-management/
├── frontend/                    # React + Vite TypeScript frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── interfaces/         # TypeScript interfaces
│   │   └── App.tsx           # Application entry point
│   ├── Dockerfile
│   └── package.json
│   ├── .env

├── backend/                     # Java Jakarta EE backend
│   ├── src/
│   │   ├── main/java/com/library/
│   │   │   ├── controllers/   # REST controllers
│   │   │   ├── models/        # JPA entities
│   │   │   ├── repositories/  # Data access layer
│   │   │   ├── services/      # Business logic
│   │   │   ├── responses/     # Response wrappers
│   │   │   └── exceptions/    # Exception handlers
│   ├── Dockerfile
│   ├── pom.xml
│   └── payara-micro.jar
├── docker-compose.yml
├── .env
└── README.md
```

## 🔧 API Endpoints

### Books API (`/backend/api/books`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books (with pagination) |
| GET | `/books/{id}` | Get book by ID |
| POST | `/books` | Create new book |
| PUT | `/books/{id}` | Update existing book |
| DELETE | `/books/{id}` | Delete book |

### Query Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Example API Usage

```bash
# Get all books
curl http://localhost:8080/backend/api/books?page=1&limit=10

# Create a new book
curl -X POST http://localhost:8080/backend/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "isbn": "9780743273565"
  }'
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f [service-name]

# Access backend container
docker exec -it backend sh
```
