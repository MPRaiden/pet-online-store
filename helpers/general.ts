import { faker } from '@faker-js/faker'
import { Pet } from '../data/types'

export function generatePetData(): Array<Pet> {
  const petData: Array<Pet> = []

  for (let i = 0; i < 5; i++) {
    petData.push({
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
    })
  }

  return petData
}


export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms)
  )
}
