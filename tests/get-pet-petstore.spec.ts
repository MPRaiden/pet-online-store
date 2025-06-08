import { test, expect } from '@playwright/test'
import { baseURL } from '../data/constants'
import { validatePetResponse } from '../validation/general'
import path from 'path'
import fs from 'fs'

const petDataPath = path.join(__dirname, 'petData.json')
const petData = JSON.parse(fs.readFileSync(petDataPath, 'utf-8'))


test('GET requests: Get pet from petstore -', async ({ request }) => {
  const response = await request.get(`${baseURL}/pet/${petData.id}`)
  const responseBody = await response.json()
  console.warn('DEBUGPRINT[33]: get-pet-petstore.spec.ts:13: responseBody=', responseBody)

  expect(response.status()).toBe(200)
  validatePetResponse(responseBody, petData)
})

test('GET /pet/{petId} – Invalid ID format → 400', async ({ request }) => {
  const invalidId = 'abc'
  const response = await request.get(`${baseURL}/pet/${invalidId}`)

  //NOTE: Test fails since server is returning 404 meaning it just cant find the id and not that the id is invalid format (meaning no input validation occurs)
  expect(response.status()).toBe(400)
})


test('GET /pet/{petId} – Pet not found → 404', async ({ request }) => {
  const nonExistentId = 999999
  const response = await request.get(`${baseURL}/pet/${nonExistentId}`)

  expect(response.status()).toBe(404)
})


test('GET /pet/{petId} – Missing ID → 405', async ({ request }) => {
  const response = await request.get(`${baseURL}/pet/`)
  expect(response.status()).toBe(405)
})


test('GET request: Retrieve pet – extremely large ID → 400 or 404', async ({ request }) => {
  const hugeId = 1e18 // Very large over int64 range
  const response = await request.get(`${baseURL}/pet/${hugeId}`)

  expect(response.status()).toBe(404)
})

