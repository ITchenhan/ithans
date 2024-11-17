const API_BASE_URL = 'http://your-api-server.com/api';

export async function fetchBlogPosts(page = 1, category = null) {
    const url = new URL(`${API_BASE_URL}/posts`);
    url.searchParams.append('page', page);
    if (category) {
        url.searchParams.append('category', category);
    }
    
    const response = await fetch(url);
    return response.json();
}

export async function fetchProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return response.json();
} 