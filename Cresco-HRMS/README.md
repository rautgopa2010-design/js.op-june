# Cresco HRMS - Human Resource Management System

A full-stack HRMS web application built with React, Node.js, and MySQL.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Styling**: CSS/Tailwind CSS (optional)

## Project Structure
```
Cresco-HRMS/
├── client/          # React Frontend
├── server/          # Node.js Backend
├── database/        # MySQL Scripts
├── .env.example     # Environment variables template
└── README.md        # This file
```

## Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- npm or yarn

### Installation

1. **Clone/Navigate to project**
   ```bash
   cd Cresco-HRMS
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your MySQL credentials
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   npm run dev
   ```

4. **Setup Database**
   - Import SQL files from `database/` folder to your MySQL
   - Or run migrations from backend

## Features (To be developed)
- [ ] Employee Management
- [ ] Attendance Tracking
- [ ] Leave Management
- [ ] Payroll Management
- [ ] Performance Reviews
- [ ] User Authentication
- [ ] Dashboard & Reports

## Development Notes
- Backend runs on `http://localhost:5000` (default)
- Frontend runs on `http://localhost:5173` (Vite default)
- MySQL runs on `localhost:3306` (default)

## License
MIT
