import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor({selectorPopup}) {
        super(selectorPopup);
        this._popupForm = this._popup.querySelector('.popup__form')
    }

    setDeleteHandle(deleteHandle) {
        this._deleteHandle = deleteHandle
    }

    open(id) {
        super.open();
        this._id = id
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._deleteHandle(this._id);
        })
        super.setEventListeners()
    }
}