import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const popupSettings = {
    formSelector: '.form',
    formFieldset: '.form__set',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    document.addEventListener('keyup', closePopupEsc);
}
function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener('keyup', closePopupEsc);
}

const closePopupEsc = (evt) => {
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

function addElement(element) {
    const card = new Card(element, '.element-template');
    const cardElement = card.generateCard();
    const elementImage = cardElement.querySelector(".element__image");
    elementImage.addEventListener("click", () => {
        openPopup(popupTypeImage);
        popupImage.src = elementImage.src;
        popupImage.alt = elementImage.alt;
        popupCaption.textContent = elementImage.alt;
    })
    return cardElement
}

function handleAddFormSubmit (evt) {
    evt.preventDefault();

    const item  = {name: popupElementTitle.value, link: popupElementLink.value}
    elementList.prepend(addElement(item))
    popupFormAdd.reset();

    const popupSubmitAddButton = popupFormAdd.querySelector('.form__submit')
    popupSubmitAddButton.setAttribute('disabled', 'disabled');
    closePopup(popupNewElement);

}

initialCards.forEach( (element)=>{
    elementList.append(addElement(element));
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

const formEditProfileValidator = new FormValidator(popupSettings, popupFormEdit);
formEditProfileValidator.enableValidation();
// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(popupSettings, popupFormAdd);
formAddNewCardValidator.enableValidation();









