import { Request, Response } from "express"
import { prisma } from "../config/prisma";
import { DecodedIdToken } from "firebase-admin/auth"

export const createPost= async (req:Request,res:Response)=>{
    const user=req.user as DecodedIdToken;
    const userId=user.uid;
    const { title,description,videoType,minBudget,maxBudget,deadline,dualEdit,referenceLinks,applicantLimit }=req.body;
    const newPost=await prisma.post.create({
        data:{
            clientId:userId,
            title,
            description,
            videoType,
            minBudget,
            maxBudget,
            deadline,
            dualEdit,
            applicantLimit:applicantLimit,
            refLink:referenceLinks,
            status:"OPEN"
        }
    })
    res.status(201).json({
        message:"Post created successfully",
        data:newPost
    })

    
}