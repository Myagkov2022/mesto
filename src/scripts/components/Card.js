export default class Card {
    constructor({data, handleOpenPopup,handleDelete, handleSetLike, handleDeleteLike,templateSelector}, userId) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardId = data._id
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
        this._handleSetLike = handleSetLike;
        this._handleDeleteLike = handleDeleteLike;
        this._handleDelete = handleDelete
    }

    _handleLike() {
        this._heart.classList.toggle('element__heart_active');
        if (this._heart.classList.contains('element__heart_active')) {
            this._handleSetLike(this._cardId)
        } else {
            this._handleDeleteLike(this._cardId)
        }

    }
    _hasLike() {
        if (this._likes.some((like) => {
            return this._userId === like._id;
        })) {
            this._heart.classList.add('element__heart_active');
        }
    }

    deleteElement() {
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
            this._handleDelete(this._cardId);
        })
        this._heart.addEventListener('click', () => {

            this._handleLike();
        })
        this._image.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._link)
        })
    }

    _hasTrash() {
        if (this._userId !== this._ownerId) {
            this._delete.remove();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._heart =  this._element.querySelector('.element__heart');
        this._count =  this._element.querySelector('.element__likes-count');
        this._delete = this._element.querySelector('.element__trash');

        this._setEventListeners();
        this._hasTrash()
        this._hasLike()
        this.setLikesCount(this._likes)
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__heading').textContent = this._name;

        return this._element;
    }

    setLikesCount(likes) {
        this._count.textContent = likes.length
    }
}