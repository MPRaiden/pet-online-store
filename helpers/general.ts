import { faker } from '@faker-js/faker'
import { Pet } from '../data/types'

export function generatePetData(): Pet {
  return {
    id: faker.number.int({ min: 1, max: 100000 }),
    category: {
      id: faker.number.int({ min: 1, max: 100000 }),
      name: faker.animal.type(),
    },
    name: faker.animal.dog(),
    photoUrls: [faker.image.url()],
    tags: [
      {
        id: faker.number.int({ min: 1, max: 10000 }),
        name: faker.word.adjective(),
      },
    ],
    status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms)
  )
}
