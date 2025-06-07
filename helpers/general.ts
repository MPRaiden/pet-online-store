import { faker } from '@faker-js/faker'
import { Pet } from '../data/types'

export function generatePetData(): Pet {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    category: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.animal.type(),
    },
    name: faker.animal.dog(),
    photoUrls: [faker.image.url()],
    tags: [
      {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.word.adjective(),
      },
    ],
    status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
  }
}

