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


const elementTemplate = document.querySelector(".element-template").content;
const elementList = document.querySelector(".elements__list");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__figcaption");

const closeButtons = document.querySelectorAll('.popup__close-btn');

const popups = document.querySelectorAll('.popup');


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
    const popup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
};

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    closePopup(popupProfile);
}

function handleAddFormSubmit (evt) {
    evt.preventDefault();

    const item  = {name: popupElementTitle.value, link: popupElementLink.value}
    elementList.prepend(addElement(item))
    popupFormAdd.reset();
    closePopup(popupNewElement);

}

function addElement(element) {
    const elementItem = elementTemplate.cloneNode(true);
    const deleteButton = elementItem.querySelector(".element__trash");
    const elementImage = elementItem.querySelector(".element__image");

    elementItem.querySelector('.element__heading').textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;
    elementItem.querySelector('.element__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle("element__heart_active");
    })

    deleteButton.addEventListener("click",  () => {
         const listItem = deleteButton.closest('.element');
         listItem.remove();
    })

    elementImage.addEventListener("click", () => {
        openPopup(popupTypeImage);
        popupImage.src = elementImage.src;
        popupImage.alt = elementImage.alt;
        popupCaption.textContent = elementImage.alt;
    })

    return elementItem
}
initialCards.forEach(function (element) {
    elementList.append(addElement(element))
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









