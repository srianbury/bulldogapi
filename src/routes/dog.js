import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const dogs = await req.context.models.Dog.find();
    return res.json({ data: dogs });
});


router.get('/:id', async (req, res) => {
    const dog = await req.context.models.Dog.findById(req.params.id);
    return res.json({ data: dog });
});

export default router;