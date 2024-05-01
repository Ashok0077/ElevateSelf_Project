import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from header

  // const token = req.cookies.access_token;

  // res.json({
  //   method: req.method,
  //   url: req.url,
  //   headers: req.headers,
  //   cookies: req.cookies,
  //   params: req.params,
  //   query: req.query,
  //   body: req.body,
  //   token: token,
  // });
  if (token === undefined) {
    return next(
      errorHandler(
        401,
        "Unauthorized: Token is missing, please allow third party cookies"
      )
    );
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid or expired token"));
    }
    req.user = user;
    next();
  });
};
