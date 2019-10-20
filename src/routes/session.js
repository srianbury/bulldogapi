import { Router } from 'express';
import { verifyToken } from '../funcs';

const router = Router();

// session for psuedo authenticated user
router.get('/', verifyToken, async (req, res) => {
    const userId = req.userInfo.user._id;
    const curUser = await req.context.models.User.findById(userId);
    return res.json({ user: curUser });
});

export default router;  