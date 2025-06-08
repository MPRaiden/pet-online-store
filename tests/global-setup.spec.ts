import { test } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { generatePetData } from '../helpers/general'
import { baseURL } from '../data/constants'

const petDataPath = path.join(__dirname, 'petData.json')

test('Creates pet data', async ({ request }) => {
  const petData = generatePetData()
  for (const pet of petData) {
    const response = await request.post(`${baseURL}/pet`, { data: pet })

    if (response.status() !== 200) {
      throw new Error('Failed to create pet')
    }

    fs.writeFileSync(petDataPath, JSON.stringify(petData))
  }
})
