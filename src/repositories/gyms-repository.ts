import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParamas {
  latitude: number
  longitude: number
}

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParamas): Promise<Gym[]>
}
