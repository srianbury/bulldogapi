import mongoose from 'mongoose';
import User from './user';
import UserPassword from './password';
import Dog from './dogs';

function connectDb(){
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
}

const models = {
    User,
    UserPassword,
    Dog
};


export default models;
export { connectDb };