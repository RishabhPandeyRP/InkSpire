import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupType = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    email: z.ZodString;
    token: z.ZodString;
    published: z.ZodBoolean;
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    title: string;
    content: string;
    token: string;
    published: boolean;
    authorId: string;
}, {
    email: string;
    title: string;
    content: string;
    token: string;
    published: boolean;
    authorId: string;
}>;
export type CreatePostType = z.infer<typeof createPostInput>;
export declare const updatePostInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    token: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    token: string;
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    email: string;
    token: string;
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type UpdatePostType = z.infer<typeof updatePostInput>;
export declare const getBlogById: z.ZodObject<{
    email: z.ZodString;
    token: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    token: string;
    id: string;
}, {
    email: string;
    token: string;
    id: string;
}>;
export type getBlogByIdType = z.infer<typeof getBlogById>;
export declare const deleteBlogById: z.ZodObject<{
    email: z.ZodString;
    token: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    token: string;
    id: string;
}, {
    email: string;
    token: string;
    id: string;
}>;
export type deleteBlogByIdType = z.infer<typeof getBlogById>;
export declare const deleteUserById: z.ZodObject<{
    email: z.ZodString;
    token: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    token: string;
    id: string;
}, {
    email: string;
    token: string;
    id: string;
}>;
export type deleteUserByIdType = z.infer<typeof getBlogById>;
