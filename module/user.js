
import mongoose from 'mongoose';

const userScheme = mongoose.Schema({
  name: String, 
  gender: String,
  age: Number,
 address:String
},{
    timestamps:true
});


export const User = mongoose.model('User', userScheme);