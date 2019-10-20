import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    sex: {
        type: Boolean,
    },
    breed: {
        type: String,
    },
    description: {
        type: String,
    },
    images: [{
        url: String,
        alt: String,
    }]
});

const Dog = mongoose.model('Dog', dogSchema);
export default Dog;