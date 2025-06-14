import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signUpInput } from '@sahalok123/common-app'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 
  const body = await c.req.json();
  const {success} = signUpInput.safeParse(body)
  if(!success) {
    c.status(411);
    return c.json({
      message: "input not correct"
    })
  }
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.username,
      password: body.password,

    }
  })
  
  const token = await sign({id: user.id}, c.env.JWT_SECRET)

  return c.json({
    jwt: token
  })
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 
  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password
    }
  })

  if(!user) {
    c.status(403);
    c.json({error: "user not found"});
  }

  const jwt = await sign({id: user?.id}, c.env.JWT_SECRET)
  return c.json({jwt})
}) 
