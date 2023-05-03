import '../../pages/index.css'

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import {
    addButton, editAvatarButton,
    editButton, editDescription, editName,
    popupFormAdd,
    popupFormEdit, popupFormEditAvatar,
    validationSettings
} from '../utils/constants.js'
import PopupDelete from "../components/PopupDelete.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: '99b2bcc6-25fe-4291-8b2c-66936ebd5efe',
        'Content-Type': 'application/json'
    }
});


const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
});


function createElement(element) {
    const card = new Card({
        data: element,
        handleOpenPopup: (name, link) => popupImage.open(name, link),
        handleDelete: (id) => {
            popupDelete.open(id)
            popupDelete.setDeleteHandle((id)=> {
                api.deleteCard(id)
                    .then(() => card.deleteElement())
                    .catch(err => console.log(`Ошибка: ${err}`))
            })
        },
        handleSetLike: (cardId) => {
            api.putCardLike(cardId)
                .then(res => card.setLikesCount(res.likes))
                .catch(err => console.log(`Ошибка: ${err}`))
        },
        handleDeleteLike: (cardId) => {
            api.deleteCardLike(cardId)
                .then(res =>  card.setLikesCount(res.likes))
                .catch(err => console.log(`Ошибка: ${err}`))
        },
        templateSelector:'.element-template'}, userInfo.userId);
    return  card.generateCard();
}

const cardsList = new Section({
    renderer: item =>  cardsList.addItem(createElement(item))
}, ".elements__list")


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, user]) => {
        userInfo.setUserInfo(user);
        cardsList.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

const formEditProfileValidator = new FormValidator(validationSettings, popupFormEdit);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(validationSettings, popupFormAdd);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(validationSettings, popupFormEditAvatar);
formEditAvatarValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners()

const popupNewElement = new PopupWithForm({
    selectorPopup:'.popup_type_new-element',
    handleSubmitForm: (newCardData) => {
        api.postNewCard(newCardData)
            .then(res => cardsList.addItem(createElement(res)))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                popupNewElement.close()
                popupNewElement.loading()
            })
    }
})

popupNewElement.setEventListeners()

const popupProfile = new PopupWithForm({
    selectorPopup:'.popup_type_profile',
    handleSubmitForm: (profileData) => {
        api.patchUserInfo(profileData)
            .then(res=> userInfo.setUserInfo(res))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                popupProfile.close()
                popupProfile.loading()
            })
    }
})

popupProfile.setEventListeners()

const popupDelete = new PopupDelete({
    selectorPopup:'.popup_type_delete-element',
})

popupDelete.setEventListeners()


const popupEditAvatar = new PopupWithForm({
    selectorPopup: '.popup_type_avatar',
    handleSubmitForm: (link) => {
        api.patchUserAvatar(link)
            .then(res => userInfo.setUserInfo(res))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                popupEditAvatar.close()
                popupEditAvatar.loading()
            })

    }
})
popupEditAvatar.setEventListeners()

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

editAvatarButton.addEventListener("click", () => {
    popupEditAvatar.open()
    formEditAvatarValidator.toggleButtonState()
})



