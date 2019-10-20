import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';
import { encrypt } from './funcs';
import { useModels, logger } from './middleware';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// custom middleware
app.use(logger);
app.use(useModels);

// application routes
app.use(`/api/${process.env.ENVIRONMENT}/session`, routes.session);
app.use(`/api/${process.env.ENVIRONMENT}/users`, routes.user);
app.use(`/api/${process.env.ENVIRONMENT}/messages`, routes.message);
app.use(`/api/${process.env.ENVIRONMENT}/login`, routes.login);

app.get('/api/', (req, res)=>{
    const welcome = 'Welcome to my fake api';
    return res.json({ welcome });
});

// set to true to reinitialize the db everytime the express server starts
const erase = true;
const eraseDbOnReload = process.env.NODE_ENV!=='production' && erase;
connectDb().then(async () => {
    if(eraseDbOnReload){
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
            models.UserPassword.deleteMany({}),
        ]);

        createUsersWithMessages();
    }

    app.listen(process.env.PORT, () =>
        console.log(`listening on port ${process.env.PORT}`)
    );
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'lcamson',
    });
    const user1Password = new models.UserPassword({
        uid: user1.id,
        password: encrypt('iamlhito')
    });
    const user2 = new models.User({
        username: 'bsunbury',
    });
    const user2Password = new models.UserPassword({
        uid: user2.id,
        password: encrypt('brianspwd')
    });

    const message1 = new models.Message({
        text: 'I am the pandamaaaaaan',
        user: user1.id
    });
    const message2 = new models.Message({
        text: 'Cant touch this',
        user: user1.id
    });
    const message3 = new models.Message({
        text: 'Seeded message',
        user: user2.id
    });

    await message1.save();
    await message2.save();
    await message3.save();

    await user1Password.save();
    await user2Password.save();

    await user1.save();
    await user2.save();
};
