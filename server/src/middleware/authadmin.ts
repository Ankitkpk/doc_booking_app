import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

 const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    const email = decoded.email;
    const password = decoded.password;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden: Invalid credentials" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
