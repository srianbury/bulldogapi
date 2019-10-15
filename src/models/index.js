import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import UserPassword from './password';


const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
}
const models = {
    User,
    Message,
    UserPassword
};


export default models;
export { connectDb };