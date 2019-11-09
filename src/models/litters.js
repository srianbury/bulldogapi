import mongoose from 'mongoose';
import { ACCESS } from '../constants';

const litterSchema = new mongoose.Schema({
    editAccess: {
        type: Array,
        default: [ACCESS.ADMIN, ACCESS.MINDFLAYER],
    },
    birthday: {
        type: Date,
    },
    breed: {
        type: String,
    },
    description: {
        type: String,
    },
    parents: {
      mom: String,
      dad: String,
    },
    images: [{
        url: String,
        alt: String,
        useForHomepage: Boolean,
    }]
});

const Litter = mongoose.model('Litter', litterSchema);
export default Litter;