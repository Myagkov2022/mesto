const editButton = document.querySelector(".profile__edit");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button")

const popupProfile = document.querySelector(".popup_type_profile");
const editClose = popupProfile.querySelector(".popup__close-btn");
let editName = popupProfile.querySelector("#popup-name");
let editDescription = popupProfile.querySelector("#popup-description");
const popupFormEdit = popupProfile.querySelector(".popup__form");

const popupNewElement = document.querySelector(".popup_type_new-element");
let popupElementTitle = popupNewElement.querySelector("#popup-title");
let popupElementLink = popupNewElement.querySelector('#popup-link');
const addClose = popupNewElement.querySelector(".popup__close-btn");
const popupFormAdd = popupNewElement.querySelector(".popup__form");


const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector(".elements__list")


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

function popupOpen(popupElement) {
    popupElement.classList.add('popup_opened');
}
function popupClose(popupElement) {
    popupElement.classList.remove('popup_opened')
}

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    popupClose(popupProfile);
}

function handleAddFormSubmit (evt) {
    evt.preventDefault();
    initialCards.unshift({name: popupElementTitle.value, link: popupElementLink.value})
    console.log(initialCards)
    elementList.prepend(addElement(initialCards[0]))

    popupClose(popupNewElement);
}

function addElement(element) {
    const elementItem = elementTemplate.cloneNode(true);
    const deleteButton = elementItem.querySelector('.element__trash');
    console.log(deleteButton)
    elementItem.querySelector('.element__image').src = element.link;
    elementItem.querySelector('.element__image').alt = " На фотографии: " + element.name;
    elementItem.querySelector('.element__heading').textContent = element.name;
    elementItem.querySelector('.element__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__heart_active');
    })

    deleteButton.addEventListener('click',  () => {
         const listItem = deleteButton.closest('.element');
         listItem.remove();
    })
    return elementItem
}
initialCards.forEach(function (element) {
    elementList.append(addElement(element))
})

editButton.addEventListener("click", () => {
    popupOpen(popupProfile)
    editName.value =  profileName.textContent;
    editDescription.value = profileDescription.textContent;
});

addButton.addEventListener("click",  () => popupOpen(popupNewElement));
editClose.addEventListener("click",  () => popupClose(popupProfile));
addClose.addEventListener("click",  () => popupClose(popupNewElement));


popupFormEdit.addEventListener("submit", handleEditFormSubmit)
popupFormAdd.addEventListener("submit",handleAddFormSubmit )






