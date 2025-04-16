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
        addImageToGallery(imageUrl);
    };
    reader.readAsDataURL(file);
});

function addImageToGallery(imageUrl) {
    const gallery = document.getElementById('gallery');

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <img src="${imageUrl}" alt="Uploaded Image">
        <div class="info">
            <p>Likes: <span class="likes">0</span></p>
            <p>Comments: <span class="comments">0</span></p>
            <p>Shares: <span class="shares">0</span></p>
            <button class="like-btn">Like</button>
            <button class="comment-btn">Comment</button>
            <button class="share-btn">Share</button>
        </div>
    `;

    // Add event listeners for buttons
    card.querySelector('.like-btn').addEventListener('click', () => {
        const likes = card.querySelector('.likes');
        likes.textContent = parseInt(likes.textContent) + 1;
    });

    card.querySelector('.comment-btn').addEventListener('click', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            const comments = card.querySelector('.comments');
            comments.textContent = parseInt(comments.textContent) + 1;
        }
    });

    card.querySelector('.share-btn').addEventListener('click', () => {
        const shares = card.querySelector('.shares');
        shares.textContent = parseInt(shares.textContent) + 1;
        alert('Image shared successfully!');
    });

    gallery.appendChild(card);
}
