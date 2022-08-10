import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()
}

main()
    .then(async () => {
        await prisma.$disconnect()
        //creating prisma queries to database
        const allUsers = await prisma.user.findMany()
        console.log(allUsers)
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })