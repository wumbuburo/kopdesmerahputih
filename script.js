function previewImage(input, imgId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.getElementById(imgId);
            imgElement.src = e.target.result;
            imgElement.style.display = 'block';
            
            // Hide the icon when image is uploaded
            const pengurusImg = input.closest('.pengurus-img');
            if (pengurusImg) {
                const icon = pengurusImg.querySelector('i');
                if (icon) {
                    icon.style.display = 'none';
                }
            }
        }
        reader.readAsDataURL(file);
    }
}