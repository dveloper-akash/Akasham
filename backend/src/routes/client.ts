import express from'express';
import { wrapAsync } from '../utils/wrapAsync';
import verifyToken from '../middlewares/verifyToken';
import { createPost } from '../controllers/clientController';

const router=express.Router();

router.post("/client/posts",wrapAsync(verifyToken),wrapAsync(createPost));

export default router;