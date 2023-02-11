let popup = document.querySelector(".popup");
let edit = document.querySelector(".profile__edit");
let close = popup.querySelector(".popup__close-btn");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let editName = popup.querySelector("#popup-name");
let editDescription = popup.querySelector("#popup-description");
let popupForm = popup.querySelector(".popup__form");

function popupOpen() {
    popup.classList.add('popup_opened');
    editName.value =  profileName.textContent;
    editDescription.value = profileDescription.textContent;
}
function popupClose() {
    popup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    popupClose();
}

edit.addEventListener("click", popupOpen);
close.addEventListener("click", popupClose);
popupForm.addEventListener("submit", handleFormSubmit)






