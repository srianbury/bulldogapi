import { Router } from 'express';
import { verifyToken } from '../funcs';
import { check } from 'express-validator';
import { useParameterValidation } from '../middleware';

const router = Router();

router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.find();
    return res.send(messages);
});

const requiredPostParams = [
    check('text').isString(),
];
router.post(
    '/', 
    verifyToken, 
    requiredPostParams, 
    useParameterValidation,
    async (req, res) => {
        const message = await req.context.models.Message.create({   
            text: req.body.text,
            user: req.userInfo.user._id
        });
    
        res.json({ message });
    }
);

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