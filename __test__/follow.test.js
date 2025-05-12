// __tests__/follow.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app
const { processedFollows } = require('../routes/api');

describe('POST /api/events/follow', () => {
  const followEventPayload = {
    user_name: 'TestFollower',
    user_id: '12345',
    followed_at: '2025-05-10T19:00:00Z',
    broadcaster_user_name: 'YourChannel',
    broadcaster_user_id: '67890',
  };

  test('It should respond with a 200 status code on successful processing', async () => {
    const response = await request(app)
      .post('/api/events/follow')
      .send(followEventPayload)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    // You might want to check the response body for a success message
    // expect(response.body).toEqual({ message: 'Follow event received and processed.' });
  });

  test('It should correctly process the follow event data (example: store in memory)', async () => {
    // In a real application, you'd likely interact with a database.
    // For this test, we'll assume your route temporarily stores processed
    // follow events in an array within your app for demonstration.

    // Modify your app.js to include a simple array for storing follows (for testing purposes only!)
    // let processedFollows = [];
    // app.post('/api/events/follow', (req, res) => {
    //   processedFollows.push(req.body);
    //   res.sendStatus(200);
    // });
    // module.exports.processedFollows = processedFollows; // Export for testing

    const initialFollowsLength = processedFollows ? processedFollows.length : 0;

    await request(app)
      .post('/api/events/follow')
      .send(followEventPayload)
      .set('Content-Type', 'application/json');

    // Now, check if the follow event data was processed (in our example, stored in the array)
    expect(processedFollows.length).toBe(initialFollowsLength + 1);
    expect(processedFollows).toContainEqual(followEventPayload);

    // Clean up the stored data after the test (important for isolation)
    processedFollows = processedFollows.filter(
      (follow) => follow.user_id !== followEventPayload.user_id
    );
  });

  test('It should respond with a 400 status code if the payload is invalid', async () => {
    const invalidPayload = { user_name: 'Invalid' }; // Missing required fields

    const response = await request(app)
      .post('/api/events/follow')
      .send(invalidPayload)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
    // You might want to check the response body for error details
    // expect(response.body).toHaveProperty('error');
  });
});

