export default class Card {
    constructor({data, handleOpenPopup, templateSelector}) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
    }

    _handleLike() {
        this._heart.classList.toggle('element__heart_active');
    }

    _handleDelete() {
        this._element.remove();
        this._templateSelector = null;
        this._image = null;
        this._heart = null;
        this._element = null;
    }
    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleDelete();
        })
        this._heart.addEventListener('click', () => {
            this._handleLike();
        })
        this._image.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._link)
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._heart =  this._element.querySelector('.element__heart');
        this._setEventListeners();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__heading').textContent = this._name;

        return this._element;
    }
}