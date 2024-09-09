const newsJsonUrl = 'https://raw.githubusercontent.com/isashishk/WSD-ETE1/main/news.json'; // API from GIThub
let newsData2 = [];
let currentPage = 1;
const itemsPerPage = 3;

window.onload = async function () {
    try {
        const response = await fetch('https://raw.githubusercontent.com/isashishk/WSD-ETE1/main/news.json');
        const data = await response.json();
        newsData2 = data;
        displayNews(newsData2);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

// Display and Paginate News
function displayNews(news, page = 1) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedNews = news.slice(startIndex, endIndex);

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    paginatedNews.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-4');
        newsElement.innerHTML = `
            <h3 class="text-lg font-semibold">${item.title}</h3>
            <p class="text-sm mb-2">${item.author}</p>
            <a href="${item.url}" target="_blank" class="text-blue-500 hover:underline">Read more</a>
            <img src="${item.urlToimage}" alt="news image" class="w-full h-48 object-cover rounded-lg mt-4">
        `;
        newsContainer.appendChild(newsElement);
    });

    displayPagination(news.length);
}

// Sort News
function sortNews() {
    const sortOption = document.getElementById('sortOption').value;
    if (sortOption === 'author') {
        newsData.sort((a, b) => a.author && b.author ? a.author.localeCompare(b.author) : 0);
    } else if (sortOption === 'date') {
        newsData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }
    displayNews(newsData, currentPage);
}

// Display Pagination
function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('mx-1', 'bg-blue-500', 'text-white', 'p-2', 'rounded');
        pageBtn.innerText = i;
        pageBtn.onclick = () => {
            currentPage = i;
            displayNews(newsData, currentPage);
        };
        pagination.appendChild(pageBtn);
    }
}
