import mongoose from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

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
});

userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = (user.password === password); //i should add crypto
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

var usermodel = mongoose.model("Users", userSchema);

export default usermodel;
