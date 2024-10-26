# Website Monitoring Dashboard

A full-stack web application for monitoring website status in real-time. Track your favorite websites, get instant status updates, and manage your monitoring list with ease.

## Features

- 🔍 Real-time website status monitoring (online/offline)
- ➕ Easy website addition with name and URL
- 📊 Status dashboard with periodic updates
- 🗑️ Simple website removal from monitoring list
- 📱 Responsive design for all devices
- 🐳 Docker support for easy deployment

## Architecture

### Frontend (React)
- Built with React functional components and hooks
- Axios for API communication
- Responsive design using CSS Flexbox/Grid

### Backend (Node.js + Express)
- RESTful API endpoints
- PostgreSQL database integration
- Automated status checking via job scheduler

#### API Endpoints
- `GET /websites` - Retrieve monitored websites
- `POST /websites` - Add new website
- `DELETE /websites/:id` - Remove website
- `GET /websites/:id/status` - Check specific website status

## Prerequisites

- Node.js
- npm 
- PostgreSQL database
- Docker and Docker Compose (optional)

## Installation & Setup

### Standard Installation

#### Backend Setup

1. Navigate to backend directory:
```bash
cd webstatus-be
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```plaintext
NODE_ENV="development"
PORT=4000
USERNAME='postgres'
PASSWORD='postgres'
DATABASE='websites'
```

4. Start the server:
```bash
npm run dev
```

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd webstatus-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

### Docker Installation

1. Clone the repository:
```bash
git https://github.com/nshutijonathan/web-monitoring.git
cd website-monitoring-dashboard
```

2. Build and run backend:
```bash
cd webstatus-be
docker-compose up --build
```

3. In a new terminal, build and run frontend:
```bash
cd webstatus-fe
docker-compose up --build
```

## Accessing the Application

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`




## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

---
Built with ❤️ by JN
