import { Router } from 'express';
import { verifyToken } from '../funcs';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.find();
    return res.send(messages);
});

router.post('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'scrtky', async (error, authData) => {
        if(!error){
            const message = await req.context.models.Message.create({   
                text: req.body.text,
                user: req.context.me.id
            });
        
            res.json({ message, authData });

        } else {
            res.status(401).json({ error });
        }
    });
    
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