import { Request, Response } from 'express';
import { prisma } from '../config/prisma'; // Assuming this is your Prisma instance
import { DecodedIdToken } from 'firebase-admin/auth';

export const saveOnboardingData = async (req: Request, res: Response) => {
    const user = req.user as DecodedIdToken;
    const userId = user.uid; // Assuming `req.user.uid` is populated by Firebase auth middleware


    const {
        role,
        username,
        displayName,
        avatarUrl,
        country,
        state,
        phone,
    } = req.body;

    if (phone) {
      const existingUser = await prisma.user.findFirst({
        where: {
          phone,
          NOT: { id: userId }, // Make sure it's not the same user
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Phone number already in use.' });
      }
    }
    


    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            role,
            currentRole: role, // ✅ Set currentRole to initial role
            username,
            displayName,
            avatarUrl,
            country,
            state,
            phone,
        },
    });

    res.status(200).json({
        message: 'User onboarding data saved successfully',
        user: updatedUser,
    });
};
export const getCurrentUser = async (req: Request, res: Response) => {
    const userId = req.user?.uid;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        console.log("no user found");
        
        return res.status(404).json({ error: 'User not found' });
    }

    const needsOnboarding = !user.username || !user.avatarUrl || !user.role;

    if (needsOnboarding) {
        return res.json({ needsOnboarding: true });
    }

    return res.json({
        email: user.email,
        username: user.username,
        role: user.role,
        displayName: user.displayName,
        country: user.country,
        state: user.state,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
    });
};
