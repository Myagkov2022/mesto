export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._formInput = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

     _showInputError( inputElement, errorMessage,) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

     _hasInvalidInput() {
        return this._formInput.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

     toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', true);
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
        this.toggleButtonState();
         this._formInput.forEach((inputElement) => {
            inputElement.addEventListener('input',  () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
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