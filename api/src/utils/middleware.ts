import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/tokenUtils";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./config";
import User from "../models/User.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const tokenVerifier = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const { valid, decoded, error } = verifyToken(token);

  if (!valid) {
    if (error === "jwt expired") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token", msg: error });
  }

  next();
};

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Error handler middleware
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token", msg: error.message });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired", msg: error.message });
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: "duplicate key", msg: error.message });
  } else if (error.name === "TypeError") {
    return res.status(400).json({ error: "type error", msg: error.message });
  }

  next(error);
};

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header provided");
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    console.log("Verifying token");
    const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    if (!payload.userId) {
      console.log("Invalid token, missing userId");
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      console.log("No user found with id:", payload.userId);
      return res.status(401).json({ error: "User not found" });
    }

    console.log("Authenticated user:", user.name);
    req.user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    };

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Export middleware functions
export default {
  requestLogger,
  tokenVerifier,
  unknownEndpoint,
  errorHandler,
  authentication,
};
