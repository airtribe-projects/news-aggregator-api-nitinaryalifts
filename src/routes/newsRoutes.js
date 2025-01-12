const express = require('express');
const { getNews, addNewsArticle } = require('../controllers/newsController');

const router = express.Router();

router.get('/', getNews);

router.post('/', addNewsArticle);

module.exports = router;
