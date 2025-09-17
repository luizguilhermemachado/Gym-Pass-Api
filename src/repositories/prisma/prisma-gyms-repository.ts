import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParamas, GymRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParamas) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM (
      SELECT *,
        ( 6371 * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
          )
        ) AS distance
      FROM gyms
    ) AS gyms_with_distance
    WHERE distance <= 10
    ORDER BY distance
  `

    return gyms
  }
}
