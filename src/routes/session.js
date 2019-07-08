import { Router } from 'express';

const router = Router();

// session for psuedo authenticated user
router.get('/', async (req, res) => {
    const curUser = await req.context.models.User.findById(req.context.me.id);
    return res.send(curUser);
});

export default router;