import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { users, messages } from './faker';

const app = express();
app.use(cors());

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
    return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
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
    return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});


app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
);
