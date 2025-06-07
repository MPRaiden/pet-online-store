import { expect } from '@playwright/test'
import { Pet } from '../data/types'

/**
 * Validates expected http request response body agaist actual response.
@param {Pet} responseBody - HTTP request response body.
@param {Pet} expectedData - HTTP request expected data (generated through generatePetData helper function using faker.js npm package.
*/
export function validatePetResponse(responseBody: Pet, expectedData: Pet): void {
  expect(responseBody.id).toBe(expectedData.id)
  expect(responseBody.name).toBe(expectedData.name)
  expect(responseBody.status).toBe(expectedData.status)
  expect(responseBody.category.id).toBe(expectedData.category.id)
  expect(responseBody.category.name).toBe(expectedData.category.name)
  expect(responseBody.photoUrls).toEqual(expectedData.photoUrls)
  expect(responseBody.tags.length).toBe(expectedData.tags.length)

  for (let i = 0; i < responseBody.tags.length; i++) {
    expect(responseBody.tags[i].id).toBe(expectedData.tags[i].id)
    expect(responseBody.tags[i].name).toBe(expectedData.tags[i].name)
  }
}

