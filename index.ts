import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  //creating a user collection in db
  await prisma.user.create({
    data: {
      name: 'Paulo Sergio',
      email: 'paulosergio@example.com',
      posts: {
        create: {
          title: 'My first prisma post',
          body: 'A very interesting stuff',
          slug: 'My first post',
        },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })

  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    //creating prisma queries to database
  })


  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })