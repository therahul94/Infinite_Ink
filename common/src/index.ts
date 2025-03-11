import z from 'zod';

export const signupSchema = z.object({
    email: z.string({
        invalid_type_error: "email should be a string!",
        required_error: "Email is a necessary field!"
    }).email(),
    password: z.string({
        invalid_type_error: "Password should be a string!",
        required_error: "Password is a necessary field!"
    }),
    name: z.string({ invalid_type_error: "Password should be a string!" }).optional()
});

export const signinSchema = z.object({
    email: z.string({
        invalid_type_error: "email should be a string!",
        required_error: "Email is a necessary field!"
    }).email(),
    password: z.string({
        invalid_type_error: "Password should be a string!",
        required_error: "Password is a necessary field!"
    }),
});

export const createblogSchema = z.object({
    title: z.string({
        invalid_type_error: "Title should be a string!",
        required_error: "Title is a necessary field!"
    }),
    content: z.string({
        invalid_type_error: "Content should be a string!",
        required_error: "Content is a necessary field!"
    }),
    published: z.boolean({
        invalid_type_error: "Published should be of type boolean!",
    }).default(false)
})

export const updateBlogSchema = z.object({
    title: z.string({
        invalid_type_error: "Title should be a string!",
    }).optional(),
    content: z.string({
        invalid_type_error: "Content should be a string!",
    }).optional(),
    published: z.boolean({
        invalid_type_error: "Published should be of type boolean!",
    }).default(false).optional(),
    author_id: z.string({
        invalid_type_error: "Published should be of type string!",
    }).uuid({
        message: "Invalid UUID"
    })
});

export type SignupTypes = z.infer<typeof signupSchema>;
export type SigninTypes = z.infer<typeof signinSchema>;
export type BlogTypes = z.infer<typeof createblogSchema>;
export type UpdateBlogTypes = z.infer<typeof updateBlogSchema>;