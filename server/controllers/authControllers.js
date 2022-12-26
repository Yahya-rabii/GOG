import User from "../models/authModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const register_users = async (req, res) => {
  const { email, password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request",
      error: "Invalid password",
    });
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = new User({
    email,
    hash,
    salt,
  });

  try {
    await user.validate();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request",
      error: "Invalid Email",
    });
  }

  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: "Email already in use",
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: "Server Error !",
    });
  }

  res.status(201).json({
    statusCode: 201,
    message: "User Registration Success",
  });
};

export const login_users = async (req, res) => {
  const { email, password } = req.body;

  const dbUser = await User.findOne({
    email: email,
  });

  if (!dbUser)
    return res.status(404).json({
      statusCode: 404,
      message: "Not Found",
      error: "User not found",
    });

  const hashedPwd = crypto
    .pbkdf2Sync(password, dbUser.salt, 1000, 64, "sha512")
    .toString("hex");

  if (hashedPwd !== dbUser.hash)
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
      error: "Invalid Credentials",
    });

  const token = jwt.sign(
    {
      id: dbUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res
    .status(200)
    .cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
    .json({
      statusCode: 200,
      message: "Login Success",
      token,
    });
};

export const checkUser = async (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "User is logged in",
    user: {
      id: req.user.id,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    },
  });
};
