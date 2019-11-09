import models from '../models';
import { encrypt } from '../funcs';
import { ACCESS } from '../constants';
import parentsPlaceholders from './placeholders/parents';
import litterPlaceholder from './placeholders/litters';

async function createUsersAndDogs(){
    const user1 = new models.User({
        username: 'ricko',
        email: 'bsunbury29+ricko@gmail.com',
        access: ACCESS.ADMIN,
    });
    const user1Password = new models.UserPassword({
        uid: user1.id,
        password: encrypt('iamgroot')
    });
    const user2 = new models.User({
        username: 'bob',
        email: 'bsunbury29+bob@gmail.com',
        access: ACCESS.MINDFLAYER,
    });
    const user2Password = new models.UserPassword({
        uid: user2.id,
        password: encrypt('heyarnold')
    });

    parentsPlaceholders.map(async parent => {
        const dog = new models.Dog(parent);
        await dog.save();
    });

    litterPlaceholder.map(async litter => {
        const lit = new models.Litter(litter);
        await lit.save();
    });

    await user1Password.save();
    await user2Password.save();

    await user1.save();
    await user2.save();
};

export default createUsersAndDogs;