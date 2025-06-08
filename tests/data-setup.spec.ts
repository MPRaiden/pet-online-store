import { test, expect } from '@playwright/test'
import { validatePetResponse } from '../validation/general'
import { generatePetData, sleep } from '../helpers/general'
import { baseURL } from '../data/constants'
import path from 'path'
import fs from 'fs'

const petDataPath = path.join(__dirname, 'petData.json')

test('Setup: Create pet in petstore', async ({ request }) => {
  const petData = generatePetData()
  const endpoint = '/pet'
  const fullURL = baseURL + endpoint

  const response = await request.post(fullURL, {
    data: petData,
  })

  expect(response.status()).toBe(200)
  const responseBody = await response.json()

  validatePetResponse(responseBody, petData)

  fs.writeFileSync(petDataPath, JSON.stringify(responseBody))

  //NOTE: 10 second avoids later test flakyness (server otherwise does not have enought time to configure resources)
  await sleep(30000)
})

