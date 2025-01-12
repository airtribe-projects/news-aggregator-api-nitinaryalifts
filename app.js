const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = [];

app.post('/users/signup', async (req, res) => {
    console.log('Received signup request:', req.body);
    const { name, email, password, preferences } = req.body;
    
    if (!email || !password || !name) {
        return res.status(400).send({ error: 'Email, password, and name are required' });
    }

    users.push({ name, email, password, preferences });
    res.status(200).send({ message: 'Signup successful' });
});

app.post('/users/login', async (req, res) => {
    console.log('Received login request:', req.body);
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = 'mock-token';
    res.status(200).send({ token });
});

app.get('/users/preferences', async (req, res) => {
    console.log('Received preferences request:', req.headers);
    const token = req.headers['authorization'];

    if (!token || token !== 'Bearer mock-token') {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = users.find(u => u.email === 'clark@superman.com');
    if (user) {
        return res.status(200).send({ preferences: user.preferences });
    }
    res.status(404).send({ error: 'User not found' });
});

app.put('/users/preferences', async (req, res) => {
    console.log('Received update preferences request:', req.body);
    const token = req.headers['authorization'];

    if (!token || token !== 'Bearer mock-token') {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = users.find(u => u.email === 'clark@superman.com');
    if (user) {
        user.preferences = req.body.preferences;
        return res.status(200).send({ message: 'Preferences updated' });
    }

    res.status(404).send({ error: 'User not found' });
});

app.get('/news', async (req, res) => {
    console.log('Received news request:', req.headers);
    const token = req.headers['authorization'];

    if (!token || token !== 'Bearer mock-token') {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    res.status(200).send({ news: ['Superman news', 'Batman news'] });
});

module.exports = app;
