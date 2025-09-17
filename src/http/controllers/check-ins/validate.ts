import { makeValidateCheckInUseCase } from '@/services/factories/make-validate-check-ins-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function validate(req: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
