import z from 'zod';

export const signUpInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signInInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

//type inference in zod
export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>