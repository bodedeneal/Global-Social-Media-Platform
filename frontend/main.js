document.getElementById('post-btn').addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    if (!content) {
        alert('Post content cannot be empty!');
        return;
    }

    // Example API call to backend
    fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        alert('Post created successfully!');
        document.getElementById('post-content').value = '';
        loadPosts();
    })
    .catch(error => console.error('Error:', error));
});

function loadPosts() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.textContent = post.content;
                postDiv.className = 'post';
                postsContainer.appendChild(postDiv);
            });
        });
}

// Load posts on page load
loadPosts();
