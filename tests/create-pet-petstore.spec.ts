import { test, expect } from '@playwright/test'
import { generatePetData } from '../helpers/general'
import { baseURL } from '../data/constants'


test('GET requests: Create pet – empty string for data → 405', async ({ request }) => {
  const res = await request.post(baseURL + '/pet', { data: '' })

  expect(res.status()).toBe(405)
})

test('GET requests: Create pet – wrong content-type → 415', async ({ request }) => {
  const petData = generatePetData()
  const res = await request.post(baseURL + '/pet', {
    data: JSON.stringify(petData),
    headers: { 'Content-Type': 'text/plain' },
  })

  expect(res.status()).toBe(415)
})

test('GET requests: Create pet – malformed JSON → 405', async ({ request }) => {
  const res = await request.post(baseURL + '/pet', {
    data: '{ name: doggie ',
    headers: { 'Content-Type': 'application/json' },
  })

  //NOTE: Malformed json for data property should be 405 but test fails with 500 status code
  expect(res.status()).toBe(405)
})


test('GET requests: Create pet – duplicate ID → 409', async ({ request }) => {
  const petData = generatePetData()
  await request.post(baseURL + '/pet', { data: petData })
  const res2 = await request.post(baseURL + '/pet', { data: petData })

  //NOTE: duplicate entry (id) usually should be 409 status code but test fails with 500 status code
  expect(res2.status()).toBe(409)
})


test('GET requests: Create pet – number for data → 400', async ({ request }) => {
  const res = await request.post(baseURL + '/pet', { data: 0 })

  //NOTE: invalid data format should be 405 but test fails with 500 status code 
  expect(res.status()).toBe(400)
})

