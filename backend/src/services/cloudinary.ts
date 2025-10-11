import express from 'express';
import dotenv from 'dotenv';
import cloudinary from '../config/cloudinary';
import { Request, Response } from 'express';
import { wrapAsync } from '../utils/wrapAsync';
import verifyToken from '../middlewares/verifyToken';
dotenv.config();

const router = express.Router();

router.post(
    '/services/generate-signature',
    wrapAsync(verifyToken),
    wrapAsync(async (req: Request, res: Response) => {
        const { public_id, folder } = req.body;

        if (!public_id) {
            return res.status(400).json({ error: 'Public ID is required' });
        }

        const timestamp = Math.round(new Date().getTime() / 1000);

        const signature = cloudinary.utils.api_sign_request(
            {
                public_id,
                folder,
                timestamp,
                invalidate: true,
            },
            process.env.CLOUDINARY_API_SECRET as string
        );

        res.json({
            signature,
            timestamp,
            apiKey: process.env.CLOUDINARY_API_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    })
);

export default router;
