import mongoose from 'mongoose';

// Define the schema for pesticides
const pesticidesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true, 
            trim: true,
            unique: true,
            minlength: 1, 
        },
        suitable_pesticides: {
            type: [String],
            require: true,
            trim: true,
        },
        not_suitable_pesticides: {
            type: [String],
            require: true,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Pesticide = mongoose.model('Pesticide', pesticidesSchema); 
export default Pesticide;
