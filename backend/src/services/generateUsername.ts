import express from 'express';
import { prisma } from "../config/prisma";
import { Request, Response } from 'express';    
import { wrapAsync } from '../utils/wrapAsync';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();
router.post('/services/generate-username', wrapAsync(verifyToken), wrapAsync(async (req: Request, res:Response) => {
  const { displayName } = req.body;
  if (!displayName) return res.status(400).json({ error: 'Display name required' });

  let username;
  let exists = true;

  do {
    const random4Digit = Math.floor(1000 + Math.random() * 9000);
    const sanitized = displayName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12);
    username = `${sanitized}${random4Digit}`;
    const userExists = await prisma.user.findUnique({ where: { username } });
    exists = !!userExists;
  } while (exists);

  return res.json({ username });
}));
export default router;
