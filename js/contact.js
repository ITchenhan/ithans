document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // 这里添加发送表单数据的逻辑
        console.log('表单数据：', data);
        alert('消息已发送！我们会尽快回复您。');
        e.target.reset();
    } catch (error) {
        console.error('发送失败：', error);
        alert('发送失败，请稍后重试。');
    }
}); 