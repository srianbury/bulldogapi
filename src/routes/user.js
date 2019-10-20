import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const users = await req.context.models.User.find();
    return res.json({ users });
});

router.get('/:userId', async (req, res) => {
    const user = await req.context.models.User.findById(req.params.userId);
    return res.json({ user });
});

router.post('/', async (req, res) => {
    const user = await req.context.models.User.create({
        username: req.body.username
    });

    return res.json({ user });
});

router.put('/:userId', async (req, res) => {
    const query = { _id: req.params.userId };
    const update = { username: req.body.username };
    const returnType = { new: true };
    const user = await req.context.models.User.findOneAndUpdate(
        query,
        update,
        returnType
    );

    return res.json({ user });
});

router.delete('/:userId', async (req, res) => {
    const query = { _id: req.params.userId };
    const user = await req.context.models.User.findById(req.params.userId);
    await req.context.models.User.deleteOne(query);
    
    return res.json({ user });
});

export default router;