import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createblogSchema, updateBlogSchema } from "@sunglah_npm/medium-blog";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blog = new Hono<
    {
        Bindings: {
            DATABASE_URL: string,
            JWT_PRIVATE_KEY: string
        },
        Variables: {
            author_id: string
        }
    }
>();

// middleware
blog.use("/*", async function authMiddleware(c, next) {
    try {
        const authHeader = c.req.header("Authorization");
        const token = authHeader?.split(" ")[1] || "";
        //verify the token
        const decodedPayload = JSON.stringify(await verify(token, c.env.JWT_PRIVATE_KEY));
        /*
            verify function will return the decodedPayload, which is of type JWTPayload(hover over it), 
            set was showing the error.
        */
        c.set("author_id", JSON.parse(decodedPayload).id);
        /*
            why? : decodedPayload.id + "", why have to add the empty string?

            what if it is c.set("author_id", decodedPayload.id);
            it will show the error on the set function.
            error: 
                No overload matches this call.
                Overload 1 of 2, '(key: "author_id", value: string): void', gave the following error.
                Argument of type 'unknown' is not assignable to parameter of type 'string'.
                Overload 2 of 2, '(key: "jwtPayload", value: any): void', gave the following error.
                Argument of type '"author_id"' is not assignable to parameter of type '"jwtPayload"'.ts(2769)
            
            Description: 
                It is showing "Argument of type '"author_id"' is not assignable to parameter of type '"jwtPayload"'.ts(2769)"
                Overload 1 of 2, '(key: "author_id", value: string): void', gave the following error.
                Argument of type 'unknown' is not assignable to parameter of type 'string'.

                so it is showing unknown is not assignable to parameter of type 'string', so in hono
                initialization we have defined the author_id as variable and its type will be the string,
                but now the returned value(decodedPayload) have the type JWTPayload in which the key
                is returning the **Unknow** type, but we needed the string type.
                press ctrl + click on verify function -> it will go to the description file jwt.d.ts
                in jwt.d.ts ->
                press ctrl + click on JWTPayload -> open new description file types.d.ts, there you will
                see this object: 
                export type JWTPayload = {
                    [key: string]: unknown; 
                    
                    // * The token is checked to ensure it has not expired.
                    
                    exp?: number;
                 
                    // * The token is checked to ensure it is not being used before a specified time.
                 
                    nbf?: number;
                    
                    // * The token is checked to ensure it is not issued in the future.
                    
                    iat?: number;
                };

                here you can clearly see the key is of string type and the value is of unknown type,
                but we need that it should return the string, so I have changed the unkown to string,
                [key: string] : string, and the error was solved.

                "this is how I debug! little proud of it. but I thought something will change, so I should
                not change the description file so I have changed it back to unkown again and the error again 
                came back."

                but now I understood that c.set("author_id", decodedPayload.id); here author_id is expecting
                a string type of value, instead it is getting the unknown type of value, so I thought what if
                I change the value from unknown to string, for that I googled, "how to change unknown type to 
                string in typescript" and it gave me this example.

                interface hehe {
                    x: unknown
                }
                
                convertion to string type
                option 1: x + "" : add empty string it will convert it to the string.
                option 2: JSON.stringify(x) : it will convert anything to string.

        */
        await next();

    } catch (error) {
        console.log(error);
        c.status(403);
        return c.json({ error: "Authentication failed!" });
    }
})

blog.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const parsedData = createblogSchema.safeParse(body);
        if(!parsedData.success) {
            c.status(411);
            return c.json({message: "Inputs are invalid"});
        }
        const newBlog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                author_id: c.get("author_id")
            }
        });
        return c.json({ id: newBlog.id });
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.json({ error: "Invalid!" });
    }
});
blog.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const {success} = updateBlogSchema.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({message: "Inputs are invalid"});
        }
        const updatedBlog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published
            }
        });
        return c.json({ id: updatedBlog.id });
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.json({ error: "Invalid!" });
    }
});

blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        // should implement the pagination, if you are getting the data in bulk then make sure you are taking it in chunks.
        // const {skip, take} = c.req.query();
        const bulkdata = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                } 
            }
        })
        return c.json({ blogs: bulkdata });
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.json({ error: "Invalid!" });
    }
})

blog.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { id } = c.req.param();
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                title: true,
                content: true
            }
        });
        return c.json({ blog });
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.json({ error: "Invalid!" });
    }
});


export default blog;