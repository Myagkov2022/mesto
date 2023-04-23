export default class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._closeButton = this._popup.querySelector('.popup__close-btn');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add("popup_opened")
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mouseup', (event) => {
            if (event.target.classList.contains('popup_opened')){
                this.close()
            }
        })
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
    }
}