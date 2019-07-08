import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.find();
    return res.send(messages);
});

router.post('/', async (req, res) => {
    const message = await req.context.models.Message.create({
        text: req.body.text,
        user: req.context.me.id
    });

    return res.send(message);
});

router.get('/:messageId', async (req, res) => {
    const message = await req.context.models.Message.findById(req.params.messageId);
    return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
    let result = null;
    const message = await req.context.models.Message.findById(req.params.messageId);
    
    if(message){
        result = await message.remove();
    }

    return res.send(result);
});

export default router;