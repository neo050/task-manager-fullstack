import request from 'supertest';
import { db }  from '../db.js';
import app     from '../index.js';

afterAll(() => db.end());

describe('POST /auth/register', () => {
  it('returns 201 & token', async () => {
    const email = `user+${Date.now()}@test.com`;

    const res = await request(app)
      .post('/auth/register')
      .send({ email, password: 'secret123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
