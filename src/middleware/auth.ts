import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// Middleware to verify JWT and attach user payload to the request
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.currentUser = payload;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

// Middleware to check if the user is an admin
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser || req.currentUser.role !== 'admin') {
    return res.status(403).send({ error: 'Forbidden' });
  }

  next();
};

// Combined middleware to use in routes
const adminAuthMiddleware = [verifyToken, requireAdmin];

export default adminAuthMiddleware;

