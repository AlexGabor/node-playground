import express from "express";
import { PrismaClient } from "@prisma/client";
import { object, string, number, date, InferType } from 'yup';

const router = express.Router();
const prisma = new PrismaClient();

const userScheme = object({
    name: string().required(),
    email: string().required()
})


router.post("/user", async (req, res, next) => {
    let user;
    try {
        user = await userScheme.validate(req.body);
    } catch {
        res.status(400).send("invalid user")
        return
    }
    const createdUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
        }
    })
    res.send({
        id: createdUser.id
    });
});

/* GET home page. */
router.get("/user", async (req, res, next) => {
      res.send(await prisma.user.findMany());
  });

export default router;
