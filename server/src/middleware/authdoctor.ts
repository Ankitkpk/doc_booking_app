import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global
{
 namespace Express{
  interface Request
  {
    docId?:string //// optional
  }
 }
}




export const authDoctor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

 const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const dtoken = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(dtoken, secret) as jwt.JwtPayload;

    req.docId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
