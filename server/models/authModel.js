import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  hash: {
    type: String,
    required: true
  },//hash: crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'),
  salt: {
    type: String,
    required: true,
  },//salt: crypto.randomBytes(16).toString('hex'),
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});




export default mongoose.model("Users", userSchema);