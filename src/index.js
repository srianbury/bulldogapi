import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

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

// application routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.get('/', (req, res)=>{
    return res.send('Welcome to my fake api');
});

// set to true to reinitialize the db everytime the express server starts
const eraseDbOnStart = true;

connectDb().then(async () => {
    if(eraseDbOnStart){
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({})
        ]);
    }

    app.listen(process.env.PORT, () =>
        console.log(`listening on port ${process.env.PORT}`)
    );
});
