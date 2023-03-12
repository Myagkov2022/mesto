
const popupSettings = {
    formSelector: '.form',
    formFieldset: '.form__set',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
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

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
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
            setEventListeners(fieldSet, popupSettings);
        });
    });
}


enableValidation(popupSettings)