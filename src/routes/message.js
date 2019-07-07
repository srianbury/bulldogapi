import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

router.post('/', (req, res) => {
    const id = 10;
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id
    };
    req.context.models.messages[id] = message;
    return res.send(message);
});

router.get('/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});

router.delete('/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.context.models.messages = otherMessages;
    return res.send(message);
});

export default router;