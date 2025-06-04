import { test, expect } from '@playwright/test';

test('Verify full request URL', async ({ request }) => {
  const baseURL = 'https://petstore.swagger.io/v2';
  const endpoint = '/pet';
  const fullURL = baseURL + endpoint

  const response = await request.post(fullURL, {
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

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.name).toBe('Lota');
  expect(responseBody.status).toBe('available');
});

