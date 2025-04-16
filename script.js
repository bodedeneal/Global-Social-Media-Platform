// Load existing posts from localStorage
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Function to save posts back to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to render the gallery
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery

    posts.forEach((post, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        // Create a list of comments
        const commentsList = post.comments.map(comment => `<li>${comment}</li>`).join('');

        card.innerHTML = `
            <img src="${post.image}" alt="Uploaded Image">
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

        // Add event listeners for buttons
        card.querySelector('.like-btn').addEventListener('click', () => {
            posts[index].likes += 1;
            savePosts();
            renderGallery();
        });

        card.querySelector('.comment-btn').addEventListener('click', () => {
            const comment = prompt('Enter your comment:');
            if (comment) {
                posts[index].comments.push(comment);
                savePosts();
                renderGallery();
            }
        });

        card.querySelector('.share-btn').addEventListener('click', () => {
            posts[index].shares += 1;
            savePosts();
            alert('Image shared successfully!');
            renderGallery();
        });

        gallery.appendChild(card);
    });
}

// Handle image upload
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image to upload.');
        console.error('No file selected.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageUrl = e.target.result;

        posts.push({
            image: imageUrl,
            likes: 0,
            comments: [],
            shares: 0,
        });

        savePosts();
        renderGallery();
    };
    reader.onerror = function () {
        console.error('Error reading the file:', reader.error);
    };
    reader.readAsDataURL(file);
});

// Initial render
renderGallery();
