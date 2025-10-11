import { Request, Response } from 'express';
import { prisma } from '../config/prisma'; // Assuming this is your Prisma instance
import { DecodedIdToken } from 'firebase-admin/auth';

export const updateUserController = async (req: Request, res: Response) => {

    const uid = (req.user as DecodedIdToken).uid; 

    const user = await prisma.user.update({
      where: { id: uid },
      data: req.body,
    });

    res.json({
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
export const updateEditorController = async (req: Request, res: Response) => {

    const uid = (req.user as DecodedIdToken).uid; 

    const user = await prisma.editorProfile.update({
      where: { userId: uid },
      data: req.body,
    });

    res.json({
        editorBio: user.bio,
        portfolio: user.portfolio,
        skills: user.skills,
        socials: user.socials,
    });
  
};
export const updateClientController = async (req: Request, res: Response) => {

    const uid = (req.user as DecodedIdToken).uid; 

    const user = await prisma.clientProfile.update({
      where: { userId: uid },
      data: req.body,
    });

    res.json({
        clientBio: user.bio,
        company: user.company,
        job: user.job,
        socials: user.socials,
    });
  
};
