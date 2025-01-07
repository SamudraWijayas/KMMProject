// middleware.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ msg: "Access Denied" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token expired" });
    req.user = user;
    next();
  });
};
