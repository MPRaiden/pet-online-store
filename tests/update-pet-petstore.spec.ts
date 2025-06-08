import { test, expect } from '@playwright/test'
import { baseURL } from '../data/constants'
import { validatePetResponse } from '../validation/general'
import path from 'path'
import fs from 'fs'
import { sleep } from '../helpers/general'

const petDataPath = path.join(__dirname, 'petData.json')
const petData = JSON.parse(fs.readFileSync(petDataPath, 'utf-8'))

//TODO: Figure out how to throttle the requests properly so you dont get flaky test failure
test('Update pet from petstore', async ({ request }) => {
  for (const pet of petData) {
    // 1) GET original pet
    const getResponse = await request.get(`${baseURL}/pet/${pet.id}`)
    await sleep(5000)
    expect(getResponse.status()).toBe(200)
    const original = await getResponse.json()

    // 2) Prepare updated data (toggle status + append to name)
    const updatedPet = {
      ...original,
      status: original.status === 'available' ? 'sold' : 'available',
      name: original.name + ' Updated',
    }

    // 3) PUT updated data
    const putResponse = await request.put(`${baseURL}/pet`, { data: updatedPet })
    await sleep(5000)

    expect(putResponse.status()).toBe(200)
    const putBody = await putResponse.json()

    // Validate response matches updatedPet
    validatePetResponse(putBody, updatedPet)

    // 4) GET again to confirm changes
    const confirmResponse = await request.get(`${baseURL}/pet/${pet.id}`)
    await sleep(5000)
    expect(confirmResponse.status()).toBe(200)
    const confirmed = await confirmResponse.json()

    validatePetResponse(confirmed, updatedPet)
  }
})

