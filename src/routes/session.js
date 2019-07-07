import { Router } from 'express';

const router = Router();

// session for psuedo authenticated user
router.get('/', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

export default router;