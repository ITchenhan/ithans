async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        displayProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function displayProjects(projects) {
    const projectsContainer = document.querySelector('.projects-grid .container');
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h2>${project.title}</h2>
                <p class="project-description">${project.description}</p>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoUrl}" class="demo-link" target="_blank">在线演示</a>
                    <a href="${project.githubUrl}" class="github-link" target="_blank">
                        <i class="fab fa-github"></i>
                        查看代码
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// 页面加载时获取数据
document.addEventListener('DOMContentLoaded', loadProjects); 