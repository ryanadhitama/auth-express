const express = require('express');
const request = require('supertest');

const app = express();
const router = require('../../app/router');
const { User } = require('../../app/models');

jest.setTimeout(20000);
app.use(express.json());
router.apply(app);

describe('Login', () => {
  it('Success login', (done) => {
    request(app)
      .post('/v1/login')
      .send({
        email: 'user@mailinator.com',
        password: '1234567'
      })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed login (invalid payload)', (done) => {
    request(app)
      .post('/v1/login')
      .send({
        email: 'user@mailinator.com'
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed login (uset not exists)', (done) => {
    request(app)
      .post('/v1/login')
      .send({
        email: 'user12@mailinator.com',
        password: '123456'
      })
      .expect(404)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed login (wrong password)', (done) => {
    request(app)
      .post('/v1/login')
      .send({
        email: 'user@mailinator.com',
        password: '1234561'
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch(done);
  });
});

describe('Register', () => {
  it('Success register', (done) => {
    request(app)
      .post('/v1/register')
      .send({
        name: 'test',
        email: 'test@mailinator.com',
        password: '1234567'
      })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed register (invalid payload)', (done) => {
    request(app)
      .post('/v1/register')
      .send({
        email: 'user@mailinator.com'
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed register (user exists)', (done) => {
    request(app)
      .post('/v1/register')
      .send({
        name: 'test',
        email: 'user@mailinator.com',
        password: '1234567'
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  afterAll(async () => {
    await User.destroy({
      where: {
        email: 'test@mailinator.com'
      }
    });
  });
});
