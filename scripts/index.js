import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards} from './constants.js'
const editButton = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup_type_profile");
const editName = popupProfile.querySelector("#popup-name");
const editDescription = popupProfile.querySelector("#popup-description");
const popupFormEdit = document.forms["form-profile"];

const popupNewElement = document.querySelector(".popup_type_new-element");
const popupElementTitle = popupNewElement.querySelector("#popup-title");
const popupElementLink = popupNewElement.querySelector("#popup-link");
const popupFormAdd = document.forms["form-add"];

const elementList = document.querySelector(".elements__list");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__figcaption");

const closeButtons = document.querySelectorAll('.popup__close-btn');

const popups = document.querySelectorAll('.popup');

const validationSettings = {
    formSelector: '.form',
    formFieldset: '.form__set',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}


function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    document.addEventListener('keyup', closePopupByEsc);
}
function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener('keyup', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    closePopup(popupProfile);
}

function handleOpenPopup(name, link) {
    openPopup(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
}
function createElement(element) {
    const card = new Card(element,handleOpenPopup ,'.element-template');
    const cardElement = card.generateCard();
    return cardElement
}

function handleAddFormSubmit (evt) {
    evt.preventDefault();

    const element  = {name: popupElementTitle.value, link: popupElementLink.value}
    elementList.prepend(createElement(element))
    popupFormAdd.reset();
    formAddNewCardValidator.toggleButtonState()
    closePopup(popupNewElement);

}

initialCards.forEach( (element)=>{
    elementList.append(createElement(element));
})

editButton.addEventListener("click", () => {
    openPopup(popupProfile)
    editName.value =  profileName.textContent;
    editDescription.value = profileDescription.textContent;
});
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((popup) => {
    popup.addEventListener('click', evt => {
        if (evt.target === evt.currentTarget) closePopup(evt.target);
    });
});

addButton.addEventListener("click",  () => openPopup(popupNewElement));
popupFormEdit.addEventListener("submit", handleEditFormSubmit);
popupFormAdd.addEventListener("submit",handleAddFormSubmit );

const formEditProfileValidator = new FormValidator(validationSettings, popupFormEdit);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(validationSettings, popupFormAdd);
formAddNewCardValidator.enableValidation();

