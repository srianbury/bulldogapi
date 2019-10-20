import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import * as Sentry from '@sentry/node';

import models, { connectDb } from './models';
import routes from './routes';
import { useModels, logger } from './middleware';
import { populatedb } from './dev';

const app = express();
if(process.env.NODE_ENV==='production'){
    console.log('initializing logger');
    Sentry.init({ dsn: process.env.SENTRY_URL });
    app.use(Sentry.Handlers.requestHandler());
    // app.use(logger); // replaced with sentry's middleware
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(useModels);

// application routes
app.use(`/api/${process.env.ENVIRONMENT}/session`, routes.session);
app.use(`/api/${process.env.ENVIRONMENT}/users`, routes.user);
app.use(`/api/${process.env.ENVIRONMENT}/dogs`, routes.dog);
app.use(`/api/${process.env.ENVIRONMENT}/login`, routes.login);

app.get('/api/', (req, res)=>{
    const welcome = 'Welcome to my fake api';
    return res.json({ welcome });
});

app.use(Sentry.Handlers.errorHandler());

// set to true to reinitialize the db everytime the express server starts
const erase = true;
const eraseDbOnReload = process.env.NODE_ENV!=='production' && erase;
connectDb().then(async () => {
    if(eraseDbOnReload){
        await Promise.all([
            models.User.deleteMany({}),
            models.Dog.deleteMany({}),
            models.UserPassword.deleteMany({}),
        ]);

        await populatedb();
    }

    app.listen(process.env.PORT, () =>
        console.log(`listening on port ${process.env.PORT}`)
    );
});
