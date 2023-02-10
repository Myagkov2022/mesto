let popup = document.querySelector(".popup");
let edit = document.querySelector(".profile__edit");
let close = popup.querySelector(".popup__close-btn");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description")
let editName = popup.querySelector("#popup-name");
let editDescription = popup.querySelector("#popup-description");
let popupSave = popup.querySelector(".popup__save");

function popupOpen() {
    popup.classList.add('popup_open');
    editName.setAttribute("value", profileName.textContent);
    editDescription.setAttribute("value", profileDescription.textContent);

}
function popupClose() {
    popup.classList.remove('popup_open')
}

function handleFormSubmit (evt) {
    evt.preventDefault();
     profileName.textContent = editName.value;
     profileDescription.textContent = editDescription.value
    popup.classList.remove('popup_open');

}

edit.addEventListener("click", popupOpen);
close.addEventListener("click", popupClose);
popupSave.addEventListener("click", handleFormSubmit)






