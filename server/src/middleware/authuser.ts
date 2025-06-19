import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global
{
 namespace Express{
  interface Request
  {
    userId?:string //// optional
  }
 }
}




export const authUser = (
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

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
