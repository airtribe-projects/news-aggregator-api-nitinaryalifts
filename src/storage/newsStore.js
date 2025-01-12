const newsStore = [];

const getAllNews = () => {
  return newsStore;
};

const addNews = (newsItem) => {
  newsStore.push(newsItem);
};

const clearAllNews = () => {
  newsStore.length = 0;
};

module.exports = { getAllNews, addNews, clearAllNews };
