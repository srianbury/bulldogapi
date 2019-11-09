import mongoose from 'mongoose';
import { ACCESS } from '../constants';

const dogSchema = new mongoose.Schema({
    editAccess: {
        type: Array,
        default: [ACCESS.ADMIN, ACCESS.MINDFLAYER],
    },
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