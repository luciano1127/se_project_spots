const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = errorMessage;

  inputElement.classList.add("modal__input_type_error");
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = "";
  inputElement.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//const hasInvalidInput = (inputList) => {
//return inputList.some((input) => {
//return !input.validity.valid;
//});
//};

const toggleButtonState = (inputElement, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  //if (hasInvalidInput(inputList)) {
  //buttonElement.classList.add("button_inactive");
  //}; //else {
  //buttonElement.classList.remove("button_inactive");
  //}
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(".modal__input");
  const buttonElement = formElement.querySelector(".modal__submit-btn");

  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
