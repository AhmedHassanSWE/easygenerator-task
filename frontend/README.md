# Full Stack Authentication System

A production-ready authentication system built with Next.js, Tailwind CSS, and NestJS with MongoDB.

## Features

- Secure user authentication with JWT
- Form validation with real-time feedback
- Protected routes and API endpoints
- Responsive design for all devices
- Error handling with user-friendly messages
- Password security with bcrypt hashing
- User session management
- API documentation with Swagger

## Tech Stack

### Frontend
- Next.js 13.5
- TypeScript
- Tailwind CSS
- Shadcn/UI components
- React Hook Form with Zod validation
- Axios for API requests

### Backend
- NestJS
- MongoDB with Mongoose
- JWT for authentication
- Password hashing with bcrypt
- API documentation with Swagger
- Logging with Winston

## Project Structure

```
├── app/                  # Next.js app directory
├── components/           # React components
├── lib/                  # Utilities and services
└── backend/              # NestJS backend application
    ├── src/              # Source code
    │   ├── auth/         # Authentication module
    │   ├── users/        # Users module
    │   ├── common/       # Common utilities
    │   └── config/       # Configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auth-system.git
cd auth-system
```

2. Install dependencies:
```bash
# Frontend dependencies
npm install

# Backend dependencies
npm run backend:install
```

3. Configure environment variables:
```bash
# Create backend .env file
cp backend/.env.example backend/.env
# Edit the file with your configuration
```

4. Start development servers:
```bash
# Frontend development server
npm run dev

# Backend development server
npm run backend:dev
```

## API Documentation

Once the backend server is running, you can access the Swagger API documentation at:
```
http://localhost:3001/api/docs
```

## Security Features

1. Password Security
   - Minimum length of 8 characters
   - At least one letter, one number, and one special character
   - Passwords are hashed using bcrypt before storage

2. Authentication
   - JWT-based authentication
   - Token expiration
   - Protected routes and API endpoints

3. Input Validation
   - Server-side validation with class-validator
   - Client-side validation with Zod
   - Protection against common attack vectors

## Deployment

### Frontend
```bash
npm run build
```

### Backend
```bash
npm run backend:build
npm run backend:start
```

## License

This project is licensed under the MIT License.