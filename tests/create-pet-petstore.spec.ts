import { test, expect } from '@playwright/test'
import { validatePetResponse } from '../validation/general'
import { sleep } from '../helpers/general'
import { baseURL } from '../data/constants'
import path from 'path'
import fs from 'fs'

const petDataPath = path.join(__dirname, 'petData.json')
const petData = JSON.parse(fs.readFileSync(petDataPath, 'utf-8'))

test('Create pet in petstore', async ({ request }) => {
  for (const pet of petData) {
    const endpoint = '/pet'
    const fullURL = baseURL + endpoint

    const response = await request.post(fullURL, {
      data: pet,
    })

    expect(response.status()).toBe(200)
    const responseBody = await response.json()

    validatePetResponse(responseBody, pet)
    sleep(1000) // Throttles requests so API is not overloaded
  }
})

