import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.send('hello from express');
});

app.listen(process.env.PORT, ()=>
    console.log(`listening on port ${process.env.PORT}`)
);
