import { test, expect } from '@playwright/test'
import { baseURL } from '../data/constants'
import { validatePetResponse } from '../validation/general'
import path from 'path'
import fs from 'fs'
import { sleep, generatePetData } from '../helpers/general'


test('Update pet from petstore', async ({ request }) => {
  const petDataPath = path.join(__dirname, 'petData.json')
  const petData = JSON.parse(fs.readFileSync(petDataPath, 'utf-8'))

  // 1) GET original pet
  const getResponse = await request.get(`${baseURL}/pet/${petData.id}`)
  expect(getResponse.status()).toBe(200)
  const original = await getResponse.json()

  // 2) Prepare updated data (toggle status + append to name)
  const updatedPet = {
    ...original,
    status: original.status === 'available' ? 'sold' : 'available',
    name: original.name + ' Updated',
  }

  // 3) PUT updated data and wait for 3 seconds (gives time to server to actually update the data)
  const putResponse = await request.put(`${baseURL}/pet`, { data: updatedPet })
  await sleep(30000)

  expect(putResponse.status()).toBe(200)
  const putBody = await putResponse.json()

  // Validate response matches updatedPet
  validatePetResponse(putBody, updatedPet)

  // 4) GET again to confirm changes
  const confirmResponse = await request.get(`${baseURL}/pet/${petData.id}`)
  expect(confirmResponse.status()).toBe(200)
  const confirmed = await confirmResponse.json()

  validatePetResponse(confirmed, updatedPet)
})


test('PUT /pet – empty string for body → 405', async ({ request }) => {
  const res = await request.put(baseURL + '/pet', { data: '' })
  expect(res.status()).toBe(405)
})


test('PUT /pet – wrong content-type → 415', async ({ request }) => {
  const payload = generatePetData()
  const res = await request.put(baseURL + '/pet', {
    data: JSON.stringify(payload),
    headers: { 'Content-Type': 'text/plain' },
  })
  expect(res.status()).toBeGreaterThanOrEqual(400)
  expect(res.status()).toBeLessThan(500)
})


test('PUT /pet – invalid ID supplied → 400', async ({ request }) => {
  const payload = generatePetData()
  // Inject a non-integer ID
  // @ts-expect-error ID type missmatch
  payload.id = 'invalid-id'
  const res = await request.put(baseURL + '/pet', {
    data: payload,
  })

  //NOTE: test fails with 500 status code
  expect(res.status()).toBe(400)
})


test('PUT /pet – extremely large numeric ID → 400', async ({ request }) => {
  const payload = generatePetData()
  // Use a very large ID beyond allowed range
  payload.id = Number.MAX_SAFE_INTEGER * 10 // ~9e16

  const response = await request.put(`${baseURL}/pet`, {
    data: payload,
  })

  //NOTE: test fails since it accepts the integer, meaning no safeguards against very large ints
  expect(response.status()).toBe(400)
})

