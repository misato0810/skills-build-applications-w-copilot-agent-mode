import express, { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router: Router = express.Router();

/**
 * GET /api/activities
 * Retrieve all activities
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { userId, teamId, limit = '10', skip = '0' } = req.query;
  
  try {
    const query: any = {};
    if (userId) query.userId = userId;
    if (teamId) query.teamId = teamId;
    
    const activities = await Activity.find(query)
      .limit(parseInt(limit as string))
      .skip(parseInt(skip as string))
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    
    const total = await Activity.countDocuments(query);
    
    res.json({
      message: 'Get activities',
      filters: { userId, teamId, limit, skip },
      activities,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

/**
 * POST /api/activities
 * Log a new activity
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { userId, type, duration, distance, calories, description } = req.body;
  
  if (!userId || !type) {
    res.status(400).json({
      error: 'Missing required fields: userId, type',
    });
    return;
  }
  
  try {
    const activity = await Activity.create({
      userId,
      type,
      duration: duration || 0,
      distance: distance || 0,
      calories: calories || 0,
      description: description || '',
    });
    
    res.status(201).json({
      message: 'Activity logged successfully',
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

/**
 * GET /api/activities/:id
 * Retrieve a specific activity
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const activity = await Activity.findById(id)
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    
    res.json({
      message: `Get activity ${id}`,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

/**
 * PUT /api/activities/:id
 * Update an activity
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;
  
  try {
    const activity = await Activity.findByIdAndUpdate(id, updates, { new: true })
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    
    res.json({
      message: `Activity ${id} updated`,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

/**
 * DELETE /api/activities/:id
 * Delete an activity
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const activity = await Activity.findByIdAndDelete(id);
    
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    
    res.json({
      message: `Activity ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
