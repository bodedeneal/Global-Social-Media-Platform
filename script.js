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

        card.innerHTML = `
            <img src="${post.image}" alt="Uploaded Image">
            <div class="info">
                <p>Likes: <span class="likes">${post.likes}</span></p>
                <p>Comments: <span class="comments">${post.comments.length}</span></p>
                <p>Shares: <span class="shares">${post.shares}</span></p>
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
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageUrl = e.target.result;

        // Add new post to the list
        posts.push({
            image: imageUrl,
            likes: 0,
            comments: [],
            shares: 0,
        });

        savePosts();
        renderGallery();
    };
    reader.readAsDataURL(file);
});

// Initial render
renderGallery();
    });

    gallery.appendChild(card);
}
