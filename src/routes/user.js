import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

router.post('/', (req, res) => {
    return res.send('received POST on user');
});

router.put('/:userId', (req, res) => {
    return res.send(`received PUT on userId: ${req.params.userId}`);
});

router.delete('/:userId', (req, res) => {
    return res.send(`received DELETE on userId: ${req.params.userId}`);
});

export default router;