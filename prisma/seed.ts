// prisma/seed.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'


async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      name: 'Super Admin',
      password: String(hashedPassword),
      role: 'ADMIN',
      level: 99,
      rank: 'PHANTOM',
      // stambuk dikosongkan karena Admin bukan Santri
    },
  })

  console.log({ admin })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())