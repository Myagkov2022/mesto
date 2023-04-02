export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._formList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

     _showInputError( inputElement, errorMessage,) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

     _hasInvalidInput() {
        return this._formList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

     _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.removeAttribute('disabled');
        }
    }

     _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

     _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

     _setEventListeners() {
        this._toggleButtonState();
         this._formList.forEach((inputElement) => {
            inputElement.addEventListener('input',  () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

         this._formElement.addEventListener('submit', (event) => {
             event.preventDefault();
         })
    }

     enableValidation() {
         this._setEventListeners();
     }
}