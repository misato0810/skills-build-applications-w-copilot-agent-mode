# OctoFit Tracker Backend API

**Express.js + TypeScript + MongoDB API Server**

## Overview

The backend logic tier for the OctoFit Tracker multi-tier application. RESTful API serving the frontend with Express.js, TypeScript, and MongoDB/Mongoose for data persistence.

## Quick Start

### Development
```bash
npm run dev
```
Starts the server with hot-reload on `http://localhost:8000`

### Build
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` directory

### Production
```bash
npm run start
```
Runs the compiled JavaScript from `dist/`

## Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit_db
CODESPACE_NAME=your-codespace-name  # Auto-set in GitHub Codespaces
```

## API Endpoints

### Health Check
```
GET  /api/health     - Server status
GET  /api/config     - Environment configuration
```

### Users
```
GET    /api/users           - Get all users
POST   /api/users           - Create new user
GET    /api/users/:id       - Get user details
PUT    /api/users/:id       - Update user
DELETE /api/users/:id       - Delete user
```

### Teams
```
GET    /api/teams              - Get all teams
POST   /api/teams              - Create new team
GET    /api/teams/:id          - Get team details
PUT    /api/teams/:id          - Update team
DELETE /api/teams/:id          - Delete team
POST   /api/teams/:id/members  - Add member to team
```

### Activities
```
GET    /api/activities        - Get activities (filterable by userId, teamId)
POST   /api/activities        - Log new activity
GET    /api/activities/:id    - Get activity details
PUT    /api/activities/:id    - Update activity
DELETE /api/activities/:id    - Delete activity
```

### Leaderboard
```
GET  /api/leaderboard                  - Global leaderboard
GET  /api/leaderboard/team/:teamId     - Team leaderboard
GET  /api/leaderboard/user/:userId     - User's leaderboard position
```

### Workouts
```
GET    /api/workouts                       - Get workout suggestions
POST   /api/workouts                       - Create new workout
GET    /api/workouts/:id                   - Get workout details
GET    /api/workouts/personalized/:userId  - Get personalized recommendations
```

## Testing Endpoints

### Using curl

```bash
# Health check
curl http://localhost:8000/api/health

# Create a user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Create a team
curl -X POST http://localhost:8000/api/teams \
  -H "Content-Type: application/json" \
  -d '{"name":"Running Club","createdBy":"user_1","description":"A team for runners"}'

# Log an activity
curl -X POST http://localhost:8000/api/activities \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_1","type":"running","duration":30,"distance":5.2,"calories":350}'

# Get leaderboard
curl http://localhost:8000/api/leaderboard

# Get workout suggestions
curl http://localhost:8000/api/workouts
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts           - Main server file
│   └── routes/
│       ├── users.ts       - User endpoints
│       ├── teams.ts       - Team endpoints
│       ├── activities.ts  - Activity endpoints
│       ├── leaderboard.ts - Leaderboard endpoints
│       └── workouts.ts    - Workout endpoints
├── dist/                  - Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env                   - Environment variables
```

## Features

- ✅ TypeScript for type safety
- ✅ Express.js for API routing
- ✅ Mongoose for MongoDB data access
- ✅ Codespaces-aware URLs (automatic in GitHub Codespaces)
- ✅ CORS middleware for frontend communication
- ✅ Error handling and middleware
- ✅ RESTful API design

## Codespaces Support

When running in GitHub Codespaces, the API automatically uses Codespaces URLs:

```typescript
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
```

This allows the frontend and backend to communicate across Codespaces ports.

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **typescript**: Type-safe JavaScript
- **tsx**: TypeScript runtime for development

## License

MIT
