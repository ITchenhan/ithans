async function loadBlogPosts() {
    try {
        const response = await fetch('api/posts.php');
        const posts = await response.json();
        displayBlogPosts(posts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

function displayBlogPosts(posts) {
    const articlesContainer = document.querySelector('.articles');
    articlesContainer.innerHTML = posts.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="date">${formatDate(post.date)}</span>
                    <span class="category">${post.category}</span>
                </div>
                <h2>${post.title}</h2>
                <p>${post.summary}</p>
                <a href="post.html?path=${post.path}" class="read-more">阅读全文 →</a>
            </div>
        </article>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 分类筛选功能
document.querySelectorAll('.category').forEach(button => {
    button.addEventListener('click', async () => {
        const category = button.textContent;
        try {
            const response = await fetch(`api/posts.php?category=${category}`);
            const posts = await response.json();
            displayBlogPosts(posts);
            
            // 更新活动分类
            document.querySelector('.category.active').classList.remove('active');
            button.classList.add('active');
        } catch (error) {
            console.error('Error filtering posts:', error);
        }
    });
});

// 搜索功能
const searchInput = document.querySelector('.search-box input');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const searchTerm = e.target.value;
        try {
            const response = await fetch(`api/posts.php?search=${searchTerm}`);
            const posts = await response.json();
            displayBlogPosts(posts);
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    }, 300);
});

// 页面加载时获取数据
document.addEventListener('DOMContentLoaded', loadBlogPosts); 