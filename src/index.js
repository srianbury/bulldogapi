import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res)=>{
    res.send('hello from express');
});

app.listen(3000, ()=>
    console.log('listening on port 3000')
);

console.log('hello world');
console.log(process.env.TEST_KEY);