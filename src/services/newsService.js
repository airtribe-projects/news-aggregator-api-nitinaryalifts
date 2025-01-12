const fetch = require('node-fetch');

const fetchNews = async () => {
  const API_KEY = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const data = await response.json();
  return data.articles;
};

module.exports = { fetchNews };
