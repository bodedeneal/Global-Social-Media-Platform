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
