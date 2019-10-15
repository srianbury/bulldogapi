import mongoose from 'mongoose';

const userPasswordSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    password: {
        type: String
    }
});

userPasswordSchema.statics.findByUid = async function(id){
    let userPwd = await this.findOne({
        uid: id
    });

    return userPwd;
};


const UserPassword = mongoose.model('UserPassword', userPasswordSchema);
export default UserPassword;
