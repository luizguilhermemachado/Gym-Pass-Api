import { Environment } from 'vitest/environments'
import 'dotenv/config'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

declare global {
  const prisma: PrismaClient
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup(global) {
    if (!process.env.DATABASE_URL) {
      throw new Error('Please provide a DATABASE_URL environment variable')
    }

    const schema = `test_${randomUUID()}`
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)
    process.env.DATABASE_URL = url.toString()

    execSync('npx prisma db push --force-reset --accept-data-loss', {
      env: { ...process.env },
      stdio: 'inherit',
    })

    // Cria instância do Prisma
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: url.toString(),
        },
      },
    })

    // Testa a conexão
    await prisma.$connect()

    // Disponibiliza globalmente
    global.prisma = prisma

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
