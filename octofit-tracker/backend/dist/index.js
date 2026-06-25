import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
dotenv.config();
const app = express();
const PORT = 8000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS middleware for Codespaces and localhost
app.use((req, res, next) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const origin = codespaceName ? `https://${codespaceName}-5173.app.github.dev` : 'http://localhost:5173';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});
// Environment info endpoint
app.get('/api/config', (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    res.json({
        environment: process.env.NODE_ENV || 'development',
        apiUrl: baseUrl,
        port: PORT,
        codespace: codespaceName || null,
    });
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        const codespaceName = process.env.CODESPACE_NAME;
        const baseUrl = codespaceName
            ? `https://${codespaceName}-8000.app.github.dev`
            : `http://localhost:${PORT}`;
        console.log(`
╔════════════════════════════════════════╗
║   OctoFit Tracker API Server          ║
╚════════════════════════════════════════╝

✓ Server running at: ${baseUrl}
✓ Environment: ${process.env.NODE_ENV || 'development'}
${codespaceName ? `✓ Codespace: ${codespaceName}` : ''}

Available endpoints:
  GET  /api/health
  GET  /api/config
  GET  /api/users
  POST /api/users
  GET  /api/teams
  POST /api/teams
  GET  /api/activities
  POST /api/activities
  GET  /api/leaderboard
  GET  /api/workouts
  POST /api/workouts
    `);
    });
};
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
export default app;
