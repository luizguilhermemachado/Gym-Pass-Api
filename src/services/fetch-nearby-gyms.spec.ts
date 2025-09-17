import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Create gym service', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      latitude: -21.8898523,
      longitude: -45.593689,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      latitude: -60.8350766,
      longitude: -80.4082204,
      phone: '',
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.8898523,
      userLongitude: -45.593689,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
