import usermodel from "../models/authModel.js";
import { verify } from "jsonwebtoken";

export function checkUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    verify(
      token,
      "kishan sheth super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await usermodel.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
}
