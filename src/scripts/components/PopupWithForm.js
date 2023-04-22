import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selectorPopup, handleSubmitForm}) {
        super(selectorPopup);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll('.form__input');
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log(this._getInputValues())
            this._handleSubmitForm(this._getInputValues());
        })
        super.setEventListeners()
    }

    close() {
        this._popupForm.reset()
        super.close();
    }
}