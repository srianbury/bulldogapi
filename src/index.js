import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models from './models';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// custom middleware
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1]
    };
    next();
});

// base
app.get('/', (req, res) => {
    return res.send('received GET');
});

app.post('/', (req, res) => {
    return res.send('received POST');
});

app.put('/', (req, res) => {
    return res.send('received PUT');
});

app.delete('/', (req, res) => {
    return res.send('received DELETE');
});

// users
app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

app.post('/users', (req, res) => {
    return res.send('received POST on user');
});

app.put('/users/:userId', (req, res) => {
    return res.send(`received PUT on userId: ${req.params.userId}`);
});

app.delete('/users/:userId', (req, res) => {
    return res.send(`received DELETE on userId: ${req.params.userId}`);
});

// messages
app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

app.post('/messages', (req, res) => {
    const id = 10;
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id
    };
    req.context.models.messages[id] = message;
    return res.send(message);
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.context.models.messages = otherMessages;
    return res.send(message);
});


// session for psuedo authenticated user
app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});


app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
);
