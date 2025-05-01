import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		PRISMA_ACCELERATE_URL: string
	}
}>()



app.post('api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_ACCELERATE_URL,
  }).$extends(withAccelerate())
 

  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,

    }
  })
  return c.text("hello world")
})

app.post('api/v1/signin', (c) => {
  
})

app.post('api/v1/blog', (c) => {
  
})

app.put('api/v1/blog', (c) => {
  
})


app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
