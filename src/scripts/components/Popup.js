export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup
        this._popup = document.querySelector(this._selectorPopup);
        this._closeButton = this._popup.querySelector('.popup__close-btn');
        this._closeByEscape = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add("popup_opened")
        document.addEventListener('keyup', this._closeByEscape);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._closeByEscape);
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