import express, { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router: Router = express.Router();

/**
 * GET /api/users
 * Retrieve all users
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Get all users',
      users,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * POST /api/users
 * Create a new user
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    res.status(400).json({
      error: 'Missing required fields: name, email, password',
    });
    return;
  }
  
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: 'User created successfully',
      user: user.toObject(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * GET /api/users/:id
 * Retrieve a specific user
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({
      message: `Get user ${id}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/**
 * PUT /api/users/:id
 * Update a user
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({
      message: `User ${id} updated`,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({
      message: `User ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
