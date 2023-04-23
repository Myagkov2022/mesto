import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selectorPopup, handleSubmitForm}) {
        super(selectorPopup);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.form__input');
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
            this.close()
        })
        super.setEventListeners()
    }

    close() {
        this._popupForm.reset()
        super.close();
    }
}