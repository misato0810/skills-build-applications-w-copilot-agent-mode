import express from 'express';
const router = express.Router();
/**
 * GET /api/users
 * Retrieve all users
 */
router.get('/', (_req, res) => {
    res.json({
        message: 'Get all users',
        users: [],
    });
});
/**
 * POST /api/users
 * Create a new user
 */
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({
            error: 'Missing required fields: name, email, password',
        });
        return;
    }
    res.status(201).json({
        message: 'User created successfully',
        user: {
            id: 'user_' + Date.now(),
            name,
            email,
            createdAt: new Date(),
        },
    });
});
/**
 * GET /api/users/:id
 * Retrieve a specific user
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: `Get user ${id}`,
        user: {
            id,
            name: 'Sample User',
            email: 'user@example.com',
        },
    });
});
/**
 * PUT /api/users/:id
 * Update a user
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    res.json({
        message: `User ${id} updated`,
        user: {
            id,
            ...updates,
        },
    });
});
/**
 * DELETE /api/users/:id
 * Delete a user
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: `User ${id} deleted`,
    });
});
export default router;
