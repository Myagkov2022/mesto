
const popupSettings = {
    formSelector: '.form',
    formFieldset: '.form__set',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(popupSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(popupSettings.errorClass);
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.removeAttribute('disabled');
    }
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(popupSettings.inputErrorClass);
    errorElement.classList.remove(popupSettings.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(popupSettings.inputSelector));
    const buttonElement = formElement.querySelector(popupSettings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

function enableValidation(popupSettings) {
    const formList = Array.from(document.querySelectorAll(popupSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(event) {
            event.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(popupSettings.formFieldset));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
}


enableValidation(popupSettings)