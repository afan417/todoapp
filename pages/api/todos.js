import prisma from '../../prisma'

export default async function handle(req, res) {
  console.log('test')

  if (req.method == 'GET') {
    // fetch all todos.
    const todos = await prisma.todo.findMany({
      orderBy: {
        completed: 'asc',
      },
    })
    return res.json({ todos })
  }
}
