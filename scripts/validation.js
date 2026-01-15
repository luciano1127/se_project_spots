const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = errorMessage;

  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList, config) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
  disableButton(buttonElement, config);
  } else {
  ableButton(buttonElement, config);
  }
};

const ableButton = (buttonElement, config) => {
 buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
};

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((inputElement) => {
hideInputError(formElement, inputElement, config);
});
};

const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);