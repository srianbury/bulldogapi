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

// custom middleware (fake auth)
app.use(async (req, res, next) => {
    req.context = {
      models,
      // me: await models.User.findByLogin('lcamson'),
    };
    next();
});

// application routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/login', routes.login);

app.get('/', (req, res)=>{
    const welcome = 'Welcome to my fake api';
    return res.json({ welcome });
});

// set to true to reinitialize the db everytime the express server starts
const eraseDbOnReload = false;
connectDb().then(async () => {
    if(eraseDbOnReload){
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({})
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
        password: 'iamlhito'
    });
    const user2 = new models.User({
        username: 'bsunbury',
        password: 'peepeepoopoo'
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

    await user1.save();
    await user2.save();
};
