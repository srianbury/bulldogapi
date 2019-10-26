import models from '../models';
import { encrypt } from '../funcs';

async function createUsersAndDogs(){
    const user1 = new models.User({
        username: 'ricko',
        email: 'bsunbury29+ricko@gmail.com',
    });
    const user1Password = new models.UserPassword({
        uid: user1.id,
        password: encrypt('iamgroot')
    });
    const user2 = new models.User({
        username: 'bob',
        email: 'bsunbury29+bob@gmail.com',
    });
    const user2Password = new models.UserPassword({
        uid: user2.id,
        password: encrypt('heyarnold')
    });

    const dog1 = new models.Dog({
        name: 'Stanley',
        birthday: '05/15/2016',
        sex: 0,
        breed: '3/4 English Bulldog',
        images: [
            { 
                url: 'https://stanleybulldogs.com/static/media/stanley.47c7c736.jpg',
                alt: 'stanley'
            }
        ]
    });

    await dog1.save();

    await user1Password.save();
    await user2Password.save();

    await user1.save();
    await user2.save();
};

export default createUsersAndDogs;