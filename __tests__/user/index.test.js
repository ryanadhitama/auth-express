const express = require('express');
const request = require('supertest');

const app = express();
const router = require('../../app/router');

jest.setTimeout(20000);
app.use(express.json());
router.apply(app);

describe('Me', () => {
  let token = null;
  const userCredential = {
    email: 'user@mailinator.com',
    password: '1234567'
  };

  beforeAll((done) => {
    request(app)
      .post('/v1/login')
      .send(userCredential)
      .expect(200)
      .then((res) => {
        expect(res.body.data.accessToken).toBeTruthy();
        token = res.body.data.accessToken;
        done();
      })
      .catch(done);
  });

  it('Success get user login', (done) => {
    request(app)
      .get('/v1/me')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed get user login (token null)', (done) => {
    request(app)
      .get('/v1/me')
      .expect(401)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed get user login (token invalid)', (done) => {
    request(app)
      .get('/v1/me')
      .set('Authorization', `Bearer ${token}sa`)
      .set('Accept', 'application/json')
      .expect(401)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  // it('Failed register (user exists)', (done) => {
  //   request(app)
  //     .post('/v1/register')
  //     .send({
  //       name: 'test',
  //       email: 'user@mailinator.com',
  //       password: '1234567'
  //     })
  //     .expect(400)
  //     .then((res) => {
  //       done();
  //     })
  //     .catch(done);
  // });

  // afterAll(async () => {
  //   await User.destroy({
  //     where: {
  //       email: 'test@mailinator.com'
  //     }
  //   });
  // });
});
