import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import UserPassword from './password';


const connectDb = () => {
    const dbUri = process.env.NODE_ENV==='production' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV;
    return mongoose.connect(dbUri, { useNewUrlParser: true });
}
const models = {
    User,
    Message,
    UserPassword
};


export default models;
export { connectDb };