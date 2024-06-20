import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
    email : z.string().email(),
    token : z.string(),
    published : z.boolean(),
    authorId : z.string()
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    email : z.string().email(),
    token : z.string(),
    id: z.string()
});

export type UpdatePostType = z.infer<typeof updatePostInput>;

export const getBlogById = z.object({
    email : z.string().email(),
    token : z.string(),
    id : z.string()
});

export type getBlogByIdType = z.infer<typeof getBlogById>

export const deleteBlogById = z.object({
    email : z.string().email(),
    token : z.string(),
    id : z.string()
});

export type deleteBlogByIdType = z.infer<typeof getBlogById>

export const deleteUserById = z.object({
    email : z.string().email(),
    token : z.string(),
    id : z.string()
});

export type deleteUserByIdType = z.infer<typeof getBlogById>