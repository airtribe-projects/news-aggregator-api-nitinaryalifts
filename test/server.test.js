const tap = require('tap');
const supertest = require('supertest');
const app = require('../app'); // Assuming your app is in the parent directory
const server = supertest(app);

const mockUser = {
    name: 'Clark Kent',
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    preferences: ['movies', 'comics'],
};

let token = '';

// Auth tests

tap.test('POST /users/signup', async (t) => {
    try {
        const response = await server.post('/users/signup').send(mockUser);
        console.log('Signup Response:', response.body);  // Log response
        t.equal(response.status, 200, 'Signup should return status 200');
        t.end();
    } catch (err) {
        console.error('Signup Error:', err);
        t.fail('Signup test failed');
        t.end();
    }
});

tap.test('POST /users/signup with missing email', async (t) => {
    try {
        const response = await server.post('/users/signup').send({
            name: mockUser.name,
            password: mockUser.password,
        });
        console.log('Signup Missing Email Response:', response.body);
        t.equal(response.status, 400, 'Should return status 400 for missing email');
        t.end();
    } catch (err) {
        console.error('Signup Missing Email Error:', err);
        t.fail('Signup test failed');
        t.end();
    }
});

tap.test('POST /users/login', async (t) => {
    try {
        const response = await server.post('/users/login').send({
            email: mockUser.email,
            password: mockUser.password,
        });
        console.log('Login Response:', response.body);
        t.equal(response.status, 200, 'Login should return status 200');
        t.hasOwnProp(response.body, 'token');
        token = response.body.token;
        t.end();
    } catch (err) {
        console.error('Login Error:', err);
        t.fail('Login test failed');
        t.end();
    }
});

tap.test('POST /users/login with wrong password', async (t) => {
    try {
        const response = await server.post('/users/login').send({
            email: mockUser.email,
            password: 'wrongpassword',
        });
        console.log('Login Wrong Password Response:', response.body);
        t.equal(response.status, 401, 'Login with wrong password should return 401');
        t.end();
    } catch (err) {
        console.error('Login with Wrong Password Error:', err);
        t.fail('Login test failed');
        t.end();
    }
});

// Preferences tests

tap.test('GET /users/preferences', async (t) => {
    try {
        const response = await server
            .get('/users/preferences')
            .set('Authorization', `Bearer ${token}`);
        console.log('Preferences Response:', response.body);
        t.equal(response.status, 200, 'Preferences should return status 200');
        t.hasOwnProp(response.body, 'preferences');
        t.same(response.body.preferences, mockUser.preferences);
        t.end();
    } catch (err) {
        console.error('Preferences Error:', err);
        t.fail('Preferences test failed');
        t.end();
    }
});

tap.test('GET /users/preferences without token', async (t) => {
    try {
        const response = await server.get('/users/preferences');
        console.log('Preferences Without Token Response:', response.body);
        t.equal(response.status, 401, 'Preferences without token should return 401');
        t.end();
    } catch (err) {
        console.error('Preferences Without Token Error:', err);
        t.fail('Preferences test failed');
        t.end();
    }
});

tap.test('PUT /users/preferences', async (t) => {
    try {
        const response = await server
            .put('/users/preferences')
            .set('Authorization', `Bearer ${token}`)
            .send({ preferences: ['movies', 'comics', 'games'] });
        console.log('Update Preferences Response:', response.body);
        t.equal(response.status, 200, 'Update preferences should return status 200');
        t.end();
    } catch (err) {
        console.error('Update Preferences Error:', err);
        t.fail('Update preferences test failed');
        t.end();
    }
});

tap.test('Check PUT /users/preferences', async (t) => {
    try {
        const response = await server
            .get('/users/preferences')
            .set('Authorization', `Bearer ${token}`);
        console.log('Check Preferences Response:', response.body);
        t.equal(response.status, 200, 'Check preferences should return status 200');
        t.same(response.body.preferences, ['movies', 'comics', 'games']);
        t.end();
    } catch (err) {
        console.error('Check Preferences Error:', err);
        t.fail('Check preferences test failed');
        t.end();
    }
});

// News tests

tap.test('GET /news', async (t) => {
    try {
        const response = await server
            .get('/news')
            .set('Authorization', `Bearer ${token}`);
        console.log('News Response:', response.body);
        t.equal(response.status, 200, 'News should return status 200');
        t.hasOwnProp(response.body, 'news');
        t.end();
    } catch (err) {
        console.error('News Error:', err);
        t.fail('News test failed');
        t.end();
    }
});

tap.test('GET /news without token', async (t) => {
    try {
        const response = await server.get('/news');
        console.log('News Without Token Response:', response.body);
        t.equal(response.status, 401, 'News without token should return 401');
        t.end();
    } catch (err) {
        console.error('News Without Token Error:', err);
        t.fail('News test failed');
        t.end();
    }
});

tap.teardown(() => {
    process.exit(0);
});
