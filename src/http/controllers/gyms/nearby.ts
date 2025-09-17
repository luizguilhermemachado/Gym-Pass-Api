import { makeFetchNearbyGymsUseCase } from '@/services/factories/make-fetch-nearby-gym-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function nearby(req: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)
  console.log('Coordenadas recebidas:', latitude, longitude)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(200).send({
    gyms,
  })
}
