import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
    const { username } = req.body;

    jwt.sign({ username }, 'scrtky', (err, token) => {
        res.json({
            token
        });
    });
});

export default router;