const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneNumberInput = document.getElementById("phoneNumber");
const photoUploadInput = document.getElementById("photoUpload");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const idCardsContainer = document.getElementById("idCardsContainer");

let selectedCard = null;

generateBtn.addEventListener("click", () => {
  idCardsContainer.innerHTML = "";
  selectedCard = null;
  downloadBtn.disabled = true;

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phoneNumber = phoneNumberInput.value.trim();
  const photo = photoUploadInput.files[0];

  if (!firstName || !lastName || !phoneNumber || !photo) {
    alert("Please fill out all fields and upload a photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const photoURL = e.target.result;

    ["design1", "design2", "design3", "design4"].forEach((design) => {
      const card = document.createElement("div");
      card.classList.add("id-card", design);
      card.innerHTML = `
        <h2>God's Embassy Ministries</h2>
        <img src="${photoURL}" alt="Student Photo">
        <h3>${firstName} ${lastName}</h3>
        <p>Phone: ${phoneNumber}</p>
        <p>Class: Systematic Theology</p>
        <p>Student Code: ${firstName.slice(0, 2).toUpperCase()}${phoneNumber.slice(-4)}</p>
      `;

      card.addEventListener("click", () => {
        if (selectedCard) selectedCard.classList.remove("selected");
        card.classList.add("selected");
        selectedCard = card;
        downloadBtn.disabled = false;
      });

      idCardsContainer.appendChild(card);
    });
  };

  reader.readAsDataURL(photo);
});

downloadBtn.addEventListener("click", () => {
  if (!selectedCard) return;

  html2canvas(selectedCard).then((canvas) => {
    const link = document.createElement("a");
    link.download = "id_card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});



