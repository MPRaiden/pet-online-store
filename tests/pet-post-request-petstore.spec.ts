import { test, expect } from '@playwright/test'
import { generatePetData } from '../helpers/general'
import { validatePetResponse } from '../validation/general'
import { baseURL } from '../data/constants'

test('Verify full request URL with randomized pet data', async ({ request }) => {
  const endpoint = '/pet'
  const fullURL = baseURL + endpoint

  const petData = generatePetData()

  const response = await request.post(fullURL, {
    data: petData,
  })

  expect(response.status()).toBe(200)
  const responseBody = await response.json()

  validatePetResponse(responseBody, petData)
})

