export default class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
    }

    _handleLike() {
        const likeBtn = this._element.querySelector('.element__heart');
        likeBtn.classList.toggle('element__heart_active');
    }

    _handleDelete() {
        this._element.remove()
        this._element = null
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleDelete();
        })
        // слушатель кнопки лайк
        this._element.querySelector('.element__heart').addEventListener('click', () => {
            this._handleLike();
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._setEventListeners();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__heading').textContent = this._name;

        return this._element;
    }
}