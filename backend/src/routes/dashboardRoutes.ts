import express, { NextFunction, Request, Response } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  "/home",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.status(200).json({ message: "welcome to dashboard" });
    } catch(err) {
        next(err);
    }
  }
);

export default router;