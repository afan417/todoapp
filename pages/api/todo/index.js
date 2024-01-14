import prisma from '../../../prisma'

export default async function handle(req, res) {
  console.log('test')

  if (req.method == 'POST') {
    // creating a new todo.

    const { title } = req.body
    const result = await prisma.todo.create({
      data: {
        title,
      },
    })
    return res.json(result)
  }
}
