import express from 'express';
import { Team } from '../models/Team';
const router = express.Router();
/**
 * GET /api/teams
 * Retrieve all teams
 */
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find()
            .populate('createdBy', 'name email')
            .populate('members', 'name email');
        res.json({
            message: 'Get all teams',
            teams,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
/**
 * POST /api/teams
 * Create a new team
 */
router.post('/', async (req, res) => {
    const { name, description, createdBy } = req.body;
    if (!name || !createdBy) {
        res.status(400).json({
            error: 'Missing required fields: name, createdBy',
        });
        return;
    }
    try {
        const team = await Team.create({
            name,
            description: description || '',
            createdBy,
            members: [createdBy],
            totalMembers: 1,
        });
        res.status(201).json({
            message: 'Team created successfully',
            team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
/**
 * GET /api/teams/:id
 * Retrieve a specific team
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const team = await Team.findById(id)
            .populate('createdBy', 'name email')
            .populate('members', 'name email');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({
            message: `Get team ${id}`,
            team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
/**
 * PUT /api/teams/:id
 * Update a team
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const team = await Team.findByIdAndUpdate(id, updates, { new: true })
            .populate('createdBy', 'name email')
            .populate('members', 'name email');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({
            message: `Team ${id} updated`,
            team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update team' });
    }
});
/**
 * DELETE /api/teams/:id
 * Delete a team
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const team = await Team.findByIdAndDelete(id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({
            message: `Team ${id} deleted`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
/**
 * POST /api/teams/:id/members
 * Add a member to a team
 */
router.post('/:id/members', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
    }
    try {
        const team = await Team.findById(id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        if (!team.members.includes(userId)) {
            team.members.push(userId);
            team.totalMembers = team.members.length;
            await team.save();
        }
        res.json({
            message: `User ${userId} added to team ${id}`,
            team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add member to team' });
    }
});
export default router;
