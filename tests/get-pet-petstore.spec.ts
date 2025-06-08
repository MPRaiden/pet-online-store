import { test, expect } from '@playwright/test'
import { baseURL } from '../data/constants'
import { validatePetResponse } from '../validation/general'
import path from 'path'
import fs from 'fs'
import { sleep } from '../helpers/general'

const petDataPath = path.join(__dirname, 'petData.json')
const petData = JSON.parse(fs.readFileSync(petDataPath, 'utf-8'))

test('Get pet from petstore', async ({ request }) => {
  for (const pet of petData) {
    const response = await request.get(`${baseURL}/pet/${pet.id}`)
    expect(response.status()).toBe(200)
    const responseBody = await response.json()

    validatePetResponse(responseBody, pet)
    sleep(3000) // Throttles requests so API is not overloaded
  }
})

