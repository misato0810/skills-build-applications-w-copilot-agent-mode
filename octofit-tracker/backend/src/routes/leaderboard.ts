import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

/**
 * GET /api/leaderboard
 * Retrieve leaderboard rankings
 */
router.get('/', (req: Request, res: Response) => {
  const { teamId, metric = 'points', limit = 10 } = req.query;
  
  res.json({
    message: 'Get leaderboard',
    filters: { teamId, metric, limit },
    leaderboard: [
      {
        rank: 1,
        userId: 'user_1',
        userName: 'Sample User 1',
        [metric as string]: 1500,
      },
      {
        rank: 2,
        userId: 'user_2',
        userName: 'Sample User 2',
        [metric as string]: 1200,
      },
      {
        rank: 3,
        userId: 'user_3',
        userName: 'Sample User 3',
        [metric as string]: 950,
      },
    ],
  });
});

/**
 * GET /api/leaderboard/team/:teamId
 * Retrieve leaderboard for a specific team
 */
router.get('/team/:teamId', (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { metric = 'points' } = req.query;
  
  res.json({
    message: `Get team leaderboard for ${teamId}`,
    teamId,
    metric,
    leaderboard: [],
  });
});

/**
 * GET /api/leaderboard/user/:userId
 * Retrieve user's leaderboard position
 */
router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  
  res.json({
    message: `Get leaderboard position for user ${userId}`,
    userId,
    position: {
      rank: 5,
      points: 800,
      totalActivities: 25,
    },
  });
});

export default router;
