import { test, expect } from '@playwright/test';

test('Add a new pet to the store', async ({ request }) => {
  const response = await request.post('https://petstore.swagger.io/v2/pet', {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
    data: {
      id: 0,
      category: {
        id: 0,
        name: 'string',
      },
      name: 'Lota',
      photoUrls: ['string'],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    },
  });

  // Assert that the response status is 200 (OK)
  expect(response.status()).toBe(200);

  // Parse the response body as JSON
  const responseBody = await response.json();

  // Assert that the response body contains the correct pet name and status
  expect(responseBody.name).toBe('Lota');
  expect(responseBody.status).toBe('available');
});

