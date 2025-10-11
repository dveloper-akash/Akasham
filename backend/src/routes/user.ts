import express from 'express';
import { getCurrentUser, saveOnboardingData } from '../controllers/userController';
import { wrapAsync } from '../utils/wrapAsync';
import  verifyToken  from '../middlewares/verifyToken';
import { updateUserController, updateEditorController, updateClientController } from '../controllers/updateController';

const router = express.Router();

router.post('/user/onboarding', wrapAsync(verifyToken), wrapAsync(saveOnboardingData));

router.get('/user/me', wrapAsync(verifyToken), wrapAsync(getCurrentUser));
router.patch('/updates/user', wrapAsync(verifyToken), wrapAsync(updateUserController));
router.patch('/updates/editor', wrapAsync(verifyToken), wrapAsync(updateEditorController));
router.patch('/updates/client', wrapAsync(verifyToken), wrapAsync(updateClientController));


export default router;
