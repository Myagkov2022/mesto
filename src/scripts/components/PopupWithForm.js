import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selectorPopup, handleSubmitForm}) {
        super(selectorPopup);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.form__input');
        this._submitButton = this._popupForm.querySelector('.form__submit');
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
            this.loading(true)
            this._handleSubmitForm(this._getInputValues());
        })
        super.setEventListeners()
    }

    close() {
        this._popupForm.reset()
        super.close();
    }

    loading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранить';
        }
    }
}