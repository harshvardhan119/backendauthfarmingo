import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  areaOfLand: {
    type: Number,
    required: false,
  },
  location: {
    type: {   
      type: String,   // GeoJSON type must be "Point"
      enum: ['Point'], // Only accept 'Point'
      required: false
    },
    coordinates: {
      type: [Number],  // Array of numbers: [longitude, latitude]
      required: false
    }
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model("Users", userSchema);

export default User;
