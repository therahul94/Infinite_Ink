import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";
import { sign } from "hono/jwt";
import { signinSchema, signupSchema } from "@sunglah_npm/medium-blog";

const user = new Hono();

user.post('/signup', async (c) => {
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const parsedMsg = signupSchema.safeParse(body);
        console.log(parsedMsg.error);
        if (!parsedMsg.success) {
            c.status(411);
            return c.json({
                message: "Inputs are not correct!"
            })
        }
        const newAuthor = await prisma.author.create({
            data: {
                email: body.email,
                name: body.name || "Anonymous",
                password: body.password
            }
        });
        const payload = { id: newAuthor.id };
        const { JWT_PRIVATE_KEY } = env<{ JWT_PRIVATE_KEY: string }>(c);
        const token = await sign(payload, JWT_PRIVATE_KEY, "HS256");

        return c.json({ token });
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({ "error": "Invalid Signup request." })
    }
});
user.post('/signin', async (c) => {
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = signinSchema.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs are not correct!"
            })
        }
        const validAuthor = await prisma.author.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!validAuthor) {
            c.status(403);
            return c.json({ error: "User not found" });
        }
        const payload = { id: validAuthor.id };
        const { JWT_PRIVATE_KEY } = env<{ JWT_PRIVATE_KEY: string }>(c);
        const token = await sign(payload, JWT_PRIVATE_KEY, "HS256");
        return c.json({ token });
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({ "error": "Invalid Signup request." })
    }
});

export default user;