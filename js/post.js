async function loadPost() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postPath = urlParams.get('path');
        
        if (!postPath) {
            throw new Error('No post path specified');
        }

        console.log('Loading post from path:', postPath);

        // 修改这里的路径，使用相对路径
        const response = await fetch(`./posts/${postPath}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Loaded content:', content);
        
        // 解析 frontmatter 和 markdown
        const { metadata, markdown } = parseMarkdown(content);
        
        // 更新页面内容
        updatePageMeta(metadata);
        const toc = generateTableOfContents(markdown);
        configureMarked();
        const htmlContent = marked.parse(markdown);
        updatePageContent(htmlContent, toc);
        
    } catch (error) {
        console.error('Error loading post:', error);
        document.querySelector('.markdown-body').innerHTML = `
            <div class="error-message">
                <h2>文章加载失败</h2>
                <p>错误信息: ${error.message}</p>
                <p>请确保文章路径正确，并且文件存在。</p>
                <p>当前尝试加载的路径: ./posts/${urlParams.get('path')}</p>
            </div>
        `;
    }
}

function parseMarkdown(content) {
    try {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const matches = content.match(frontMatterRegex);
        
        if (!matches) {
            throw new Error('Invalid markdown format');
        }
        
        const metadata = parseYaml(matches[1]);
        const markdown = matches[2];
        
        console.log('Parsed metadata:', metadata);
        return { metadata, markdown };
    } catch (error) {
        console.error('Error parsing markdown:', error);
        throw error;
    }
}

function updatePageMeta(metadata) {
    document.title = `${metadata.title} - IT·陈寒的博客`;
    document.querySelector('.post-date').textContent = formatDate(metadata.date);
    document.querySelector('.post-category').textContent = metadata.category;
    document.querySelector('.post-title').textContent = metadata.title;
    
    const tagsHtml = metadata.tags.map(tag => 
        `<span class="post-tag">${tag}</span>`
    ).join('');
    document.querySelector('.post-tags').innerHTML = tagsHtml;
}

function generateTableOfContents(markdown) {
    const headings = markdown.match(/^#{1,3} .+$/gm) || [];
    return headings.map(heading => {
        const level = heading.match(/^#+/)[0].length;
        const text = heading.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return { level, text, id };
    });
}

function configureMarked() {
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });
}

function updatePageContent(htmlContent, toc) {
    // 添加目录
    const tocHtml = `
        <div class="post-toc">
            <h3>目录</h3>
            <ul>
                ${toc.map(item => `
                    <li class="toc-level-${item.level}">
                        <a href="#${item.id}">${item.text}</a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    // 更新文章内容
    const contentWrapper = document.querySelector('.post-content .container');
    contentWrapper.insertAdjacentHTML('afterbegin', tocHtml);
    document.querySelector('.markdown-body').innerHTML = htmlContent;
    
    // 添加标题锚点
    document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3').forEach(heading => {
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;
    });

    // 处理代码块
    document.querySelectorAll('pre code').forEach(block => {
        // 添加复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = '复制代码';
        
        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    });

    // 处理图片预览
    document.querySelectorAll('.markdown-body img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            showImagePreview(img.src, img.alt);
        });
    });
}

async function loadRelatedPosts(tags) {
    try {
        const response = await fetch(`api/related-posts.php?tags=${tags.join(',')}`);
        const posts = await response.json();
        
        const relatedPostsHtml = `
            <div class="related-posts">
                <h3>相关文章</h3>
                <div class="related-posts-grid">
                    ${posts.map(post => `
                        <a href="post.html?path=${post.path}" class="related-post-card">
                            <img src="${post.image}" alt="${post.title}">
                            <h4>${post.title}</h4>
                            <p>${post.summary}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.querySelector('.post-footer').insertAdjacentHTML('beforebegin', relatedPostsHtml);
    } catch (error) {
        console.error('Error loading related posts:', error);
    }
}

function initComments() {
    const commentsSection = `
        <div class="comments-section">
            <h3>评论</h3>
            <div class="comment-form">
                <textarea placeholder="写下你的评论..."></textarea>
                <button class="submit-comment">发表评论</button>
            </div>
            <div class="comments-list">
                <!-- 评论将动态加载到这里 -->
            </div>
        </div>
    `;
    
    document.querySelector('.post-footer').insertAdjacentHTML('beforebegin', commentsSection);
}

function initShareButtons() {
    const shareButtons = `
        <div class="share-buttons">
            <h3>分享文章</h3>
            <div class="share-icons">
                <button onclick="shareToWeixin()">
                    <i class="fab fa-weixin"></i> 微信
                </button>
                <button onclick="shareToWeibo()">
                    <i class="fab fa-weibo"></i> 微博
                </button>
                <button onclick="copyLink()">
                    <i class="fas fa-link"></i> 复制链接
                </button>
            </div>
        </div>
    `;
    
    document.querySelector('.post-header').insertAdjacentHTML('beforeend', shareButtons);
}

// 分享功能
function shareToWeixin() {
    // 生成二维码并显示弹窗
    const qrcode = new QRCode(document.createElement("div"), {
        text: window.location.href,
        width: 128,
        height: 128
    });
    showModal("微信分享", qrcode.querySelector("img"));
}

function shareToWeibo() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title}`);
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("链接已复制到剪贴板！");
    });
}

// 辅助函数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 添加图片预览功能
function showImagePreview(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.innerHTML = `
        <div class="image-preview-content">
            <img src="${src}" alt="${alt}">
            <button class="close-preview">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.className === 'close-preview') {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
}

// 添加阅读进度条
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// 添加文章阅读量统计
async function updateReadCount() {
    const postPath = new URLSearchParams(window.location.search).get('path');
    try {
        await fetch('api/update-read-count.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: postPath })
        });
    } catch (error) {
        console.error('Error updating read count:', error);
    }
}

// 在页面加载时初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    loadPost();
    initReadingProgress();
    updateReadCount();
}); 