import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const litters = await req.context.models.Litter.find();
    return res.json({ data: litters });
});

export default router;