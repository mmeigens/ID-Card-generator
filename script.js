const paymentCodes = ["ABC123", "CODE2", "CODE3", "CODE4"]; // Replace with your actual payment codes
const usedPaymentCodes = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const studentForm = document.getElementById('student-form');
    const downloadButton = document.getElementById('download-button');

    if (!studentForm) {
        console.error("Error: student-form element not found!");
    }

    if (!downloadButton) {
        console.error("Error: download-button element not found!");
    }

    if (studentForm) {
        studentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("student-form submitted");

            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const phone = document.getElementById('phone').value;
            const bloodType = document.getElementById('blood-type').value;
            const address = document.getElementById('address').value;
            const idPictureFile = document.getElementById('id-picture').files[0];

            const studentCode = firstName.substring(0, 2).toUpperCase() + phone.slice(-4);

            const reader = new FileReader();
            reader.onload = function(e) {
                const imageDataUrl = e.target.result;
                document.getElementById('id-picture-preview').src = imageDataUrl;
                document.getElementById('id-picture-preview').style.display = 'block';
                displayAllCards(imageDataUrl, firstName, lastName, phone, bloodType, address, studentCode);
            };
            reader.onerror = function(error) {
                console.error("Error reading image file:", error);
                alert("Error processing the image. Please try again.");
            };
            reader.readAsDataURL(idPictureFile);
        });
    }

    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            console.log("download-button clicked");
            const enteredCode = document.getElementById('payment-code').value.trim();
            const errorMessageElement = document.getElementById('error-message');

            if (paymentCodes.includes(enteredCode) && !usedPaymentCodes.includes(enteredCode)) {
                downloadAllCards();
                usedPaymentCodes.push(enteredCode);
                errorMessageElement.textContent = "";
                document.getElementById('payment-code').value = "";
            } else if (usedPaymentCodes.includes(enteredCode)) {
                errorMessageElement.textContent = "This code has already been used.";
            } else {
                errorMessageElement.textContent = "Incorrect Payment Code";
            }
        });
    }

    function displayAllCards(imageDataUrl, firstName, lastName, phone, bloodType, address, studentCode) {
        console.log("displayAllCards() called");
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`card-image-${i}`).src = imageDataUrl;
            document.getElementById(`card-name-${i}`).textContent = firstName + ' ' + lastName;
            document.getElementById(`card-phone-${i}`).textContent = phone;
            document.getElementById(`card-blood-${i}`).textContent = bloodType;
            document.getElementById(`card-address-${i}`).textContent = address;
            document.getElementById(`card-code-${i}`).textContent = studentCode;
        }

        document.getElementById('download-section').style.display = 'block';
        document.getElementById('card-1').style.display = 'block';
        document.getElementById('card-2').style.display = 'block';
        document.getElementById('card-3').style.display = 'block';
        document.getElementById('card-4').style.display = 'block';
        console.log("displayAllCards() completed");
    }

    function previewImage(input, previewId) {
        const preview = document.getElementById(previewId);
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.onerror = function(error) {
                console.error("Error reading file for preview:", error);
                alert("Error displaying the preview. Please try again.");
            };
            reader.readAsDataURL(file);
        } else {
            preview.src = '#';
            preview.style.display = 'none';
        }
    }

    function downloadAllCards() {
        console.log("downloadAllCards() started");
        const cards = document.querySelectorAll('.card');
        if (!cards || cards.length === 0) {
            console.error("No card elements found for download!");
            return;
        }

        let downloadedCount = 0;
        const totalCards = cards.length;

        cards.forEach((card, index) => {
            console.log(`Processing card ${index + 1} for download`);
            try {
                html2canvas(card).then(canvas => {
                    console.log(`html2canvas success for card ${index + 1}`);
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/jpeg');
                    link.download = `student_id_card_design_${index + 1}.jpg`;
                    link.click();
                    downloadedCount++;

                    if (downloadedCount === totalCards) {
                        console.log("All cards downloaded");
                        alert("All ID cards downloaded successfully!");
                    }
                }).catch(error => {
                    console.error(`html2canvas error for card ${index + 1}:`, error);
                    alert(`Error downloading card ${index + 1}. Please try again.`);
                });
            } catch (error) {
                console.error(`Error processing card ${index + 1}:`, error);
                alert(`Error downloading card ${index + 1}. Please try again.`);
            }
        });
        console.log("downloadAllCards() finished processing all cards");
    }
});

