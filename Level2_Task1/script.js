let page = 1; // Initial page number
const pageSize = 30; // Number of articles per page
const apiKey = 'd6dfc8d0b8d2424ba41b8ee6944fe116';

function fetchNews(page) {
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      const newsContainer = document.getElementById('news');

      articles.forEach(article => {
        const card = `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
              <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href="${article.url}" class="btn btn-primary">Read more</a>
              </div>
            </div>
          </div>
        `;
        newsContainer.innerHTML += card;
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchNews(page); // Fetch initial news articles

  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    page++; // Increment page number
    fetchNews(page); // Fetch more news articles
  });
});