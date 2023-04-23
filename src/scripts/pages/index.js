import '../../pages/index.css'

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    addButton,
    editButton, editDescription, editName,
    initialCards,
    popupFormAdd,
    popupFormEdit,
    validationSettings
} from '../utils/constants.js'

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
});

function createElement(element) {
    const card = new Card({
        data: element,
        handleOpenPopup: (name, link) => popupImage.open(name, link),
        templateSelector:'.element-template'});
    return  card.generateCard();
}

const cardsList = new Section({
    items:initialCards,
    renderer: item =>  cardsList.addItem(createElement(item))
}, ".elements__list")

cardsList.renderItems()

const formEditProfileValidator = new FormValidator(validationSettings, popupFormEdit);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(validationSettings, popupFormAdd);
formAddNewCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners()

const popupNewElement = new PopupWithForm({
    selectorPopup:'.popup_type_new-element',
    handleSubmitForm: (newCardData) => {
        cardsList.addItem( createElement(newCardData))
    }
})

popupNewElement.setEventListeners()

const popupProfile = new PopupWithForm({
    selectorPopup:'.popup_type_profile',
    handleSubmitForm: (profileData) => {
        userInfo.setUserInfo(profileData)
    }
})

popupProfile.setEventListeners()

addButton.addEventListener("click",  () =>  {
    popupNewElement.open()
    formAddNewCardValidator.toggleButtonState()
});
editButton.addEventListener("click",() => {
    const user = userInfo.getUserInfo()
    editName.value = user.name
    editDescription.value = user.description
    popupProfile.open()
})

