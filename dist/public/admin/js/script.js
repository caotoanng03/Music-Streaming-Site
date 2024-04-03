// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagePreview.src = image;
        }
    });
}
// End Upload Image

// Upload Audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
    const source = uploadAudio.querySelector("source");

    uploadAudioInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const audio = URL.createObjectURL(e.target.files[0]);

            source.src = audio;
            uploadAudioPlay.load();
        }
    });
}
// End Upload Audio

// Delete Song Item
const deleteButtons = document.querySelectorAll("[button-delete]");
if (deleteButtons.length > 0) {
    const formDeleteItem = document.getElementById("form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const isReady = confirm("Are you sure to delete?");
            if (isReady) {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;

                // update route
                formDeleteItem.action = action;

                formDeleteItem.submit();

            }
        });
    })

}
// End Delete Song Item
