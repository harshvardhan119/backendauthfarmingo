
import mongoose from 'mongoose'
const querySchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    lname:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    message:{
        type:String,
        require:true,
        trim:true,
        unique:true
    }
},{
    timestamps:true
})

const queries = mongoose.model("queries", querySchema);
export default queries;