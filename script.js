const API_URL = 'http://localhost:3000/api/posts'; // Replace with your backend URL

// Fetch and display all posts
function fetchPosts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(posts => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = ''; // Clear the gallery

            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';

                const commentsList = post.comments.map(comment => `<li>${comment}</li>`).join('');

                card.innerHTML = `
                    <img src="${post.imageUrl}" alt="Uploaded Image">
                    <div class="info">
                        <p>Likes: <span class="likes">${post.likes}</span></p>
                        <p>Shares: <span class="shares">${post.shares}</span></p>
                        <div>
                            <p>Comments:</p>
                            <ul class="comments-list">${commentsList}</ul>
                        </div>
                        <button class="like-btn">Like</button>
                        <button class="comment-btn">Comment</button>
                        <button class="share-btn">Share</button>
                    </div>
                `;

                // Like a post
                card.querySelector('.like-btn').addEventListener('click', () => {
                    fetch(`${API_URL}/${post.id}/like`, { method: 'POST' })
                        .then(() => fetchPosts());
                });

                // Comment on a post
                card.querySelector('.comment-btn').addEventListener('click', () => {
                    const comment = prompt('Enter your comment:');
                    if (comment) {
                        fetch(`${API_URL}/${post.id}/comment`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ comment }),
                        }).then(() => fetchPosts());
                    }
                });

                document.getElementById('gallery').appendChild(card);
            });
        });
}

// Upload a new post
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageUrl = e.target.result; // Convert image to Base64

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl }),
        })
            .then(() => {
                fileInput.value = ''; // Clear the file input
                fetchPosts();
            });
    };
    reader.onerror = function () {
        console.error('Error reading the file:', reader.error);
    };
    reader.readAsDataURL(file);
});

// Initial fetch
fetchPosts();
