import usermodel from "../models/authModel.js";
import {verify} from "jsonwebtoken";

  
export const authMiddleware = (isAdminRequired) => async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Token not found",
            error: "Unauthorized",
        });
    }
    try {
        const { id } = verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(id);
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not found",
                error: "Unauthorized",
            });
        }
        if (isAdminRequired && !user.isAdmin) {
            return res.status(401).json({
                statusCode: 401,
                message: "Admin access required",
                error: "Unauthorized",
            });
        }
        req.user = user;//object user is added to the request object so that it can be used in the next middleware
        next();
    } catch (error) {
        return res
        .status(401)
        .clearCookie("jwt")
        .json({
            statusCode: 401,
            message: "Invalid token",
            error: "Unauthorized",
        });
    }
};