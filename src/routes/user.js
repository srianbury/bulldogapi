import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const users = await req.context.models.User.find();
    return res.send(users);
});

router.get('/:userId', async (req, res) => {
    const user = await req.context.models.User.findById(req.params.userId);
    return res.send(user);
});

// todo
router.post('/', async (req, res) => {
    const user = await req.context.models.User.create({
        username: req.body.username
    });

    return res.send(user);
});

// todo
router.put('/:userId', (req, res) => {
    return res.send(`received PUT on userId: ${req.params.userId}`);
});

// todo
router.delete('/:userId', (req, res) => {
    return res.send(`received DELETE on userId: ${req.params.userId}`);
});

export default router;