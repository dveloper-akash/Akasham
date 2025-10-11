import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { DecodedIdToken } from "firebase-admin/auth";

const handleAuth = async (user: DecodedIdToken, provider: "email" | "google") => {
  const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });
  if (existingUser) return { user: existingUser, isNew: false };

  const newUser = await prisma.user.create({
    data: {
      id: user.uid,
      email: user.email!,
      provider,
    },
  });

  return { user: newUser, isNew: true };
};

// ✅ Single common controller for all providers
export const userAuth = async (req: Request, res: Response) => {
  const user = req.user as DecodedIdToken;

  const provider = user.firebase.sign_in_provider as "email" | "google";

  const { user: result, isNew } = await handleAuth(user, provider);

  res.status(isNew ? 201 : 200).json({ 
    message: isNew ? "User created" : "User logged in", 
    user: result 
  });
};
