# AchieveHub — Student Achievement & Portfolio Management System

## Features
- Student registration/login using JWT
- Submit achievements and certificate links
- Track pending/approved/rejected status
- Faculty/Admin review dashboard
- Approved achievements portfolio
- Profile editing and MongoDB storage
- Responsive React interface

## Setup
1. Install Node.js LTS and have a MongoDB Atlas/local database ready.
2. In `server`, copy `.env.example` to `.env`, then set `MONGO_URI` and a long random `JWT_SECRET`.
3. Terminal 1: `cd server && npm install && npm run dev`
4. Terminal 2: `cd client && npm install && npm run dev`
5. Open `http://localhost:5173`. API health: `http://localhost:5000/api/health`.

To create an Admin: register on the website, set `ADMIN_EMAIL` in `server/.env` to that account's email, then run `cd server && npm run make-admin`. Registration always creates a Student account.
Certificate evidence is saved as a URL; direct file upload can be added later. Never share your database password or commit `.env`.
