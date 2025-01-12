const { getAllNews, addNews } = require('../storage/newsStore');

const getNews = (req, res) => {
  const news = getAllNews();
  res.json({ news });
};

const addNewsArticle = (req, res) => {
  const { title, description, url } = req.body;
  const newNews = { title, description, url };
  addNews(newNews);
  res.status(201).json({ message: 'News article added successfully', news: newNews });
};

module.exports = { getNews, addNewsArticle };
