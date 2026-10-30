import "./index.css";
import { enableValidation, settings, resetValidation, disableButton } from "../scripts/validation.js";
import  Api  from "../utils/api.js";
import { setBtnText } from "../utils/helpers.js";
// import { settings } from "./validation.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "33f04f08-14f2-453b-808b-10b6827b9e37",
    "Content-Type": "application/json"
  }
});

api
.getAppInfo()
  .then(([cards, userInfo]) => {
     cards.forEach(function (item) {
  const card = getCardElement(item);
  cardList.append(card);
})
return userInfo;
  })
  .then((userInfo) => {
  avatarEl.src = userInfo.avatar;
  profileNameEl.textContent = userInfo.name;
  profileDescriptionEl.textContent = userInfo.about;
  })
  .catch(console.error);

const avatarEl = document.querySelector(".profile__avatar");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileSubmitBtn = editProfileModal.querySelector(".modal__submit-btn");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const newPostImageInput = newPostModal.querySelector("#card-image-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const editAvatarBtn = document.querySelector(".profile__avatar-edit-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");

const deletePostModal = document.querySelector("#delete-post-modal");
const deletePostCloseBtn = deletePostModal.querySelector(".modal__close-btn");
const deletePostForm = deletePostModal.querySelector(".modal__form");
const deleteCancelBtn = deletePostModal.querySelector(".modal__cancel-btn");
const deleteSubmitBtn = deletePostModal.querySelector(".modal__submit-btn");

let selectedCard, selectedCardId;

const cardList = document.querySelector(".cards__list");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  if (data.isLiked) {
  cardLikeBtnEl.classList.add("card__like-btn_active");
}

  cardLikeBtnEl.addEventListener("click", (evt) => {
    // evt.target.classList.add("card__like-btn_active");
    handleLikeCard(evt, data._id);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  cardDeleteBtnEl.addEventListener("click", () => {
   handleDeleteCard(cardElement, data._id);
});

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeHandler);
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

deletePostCloseBtn.addEventListener("click", function () {
  closeModal(deletePostModal);
});

deleteCancelBtn.addEventListener("click", function () {
  closeModal(deletePostModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

function handleLikeCard(evt, cardId) {

  const isLiked = evt.target.classList.contains("card__like-btn_active");

  api.changeLikeCardStatus(cardId, isLiked)
    .then((cardId) => {
      evt.target.classList.toggle("card__like-btn_active");
      console.log(`Card ${cardId} like status changed to ${!isLiked}`);
    })
    .catch(console.error);
}


function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
setBtnText(editAvatarSubmitBtn, true);
  api.editAvatarInfo({ avatar: editAvatarInput.value })
  .then((data) => {
    avatarEl.src = data.avatar;
    disableButton(editAvatarSubmitBtn, settings);
    closeModal(editAvatarModal);
  })
  .catch(console.error);
}

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  setBtnText(editProfileSubmitBtn, true);

  api.
  editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value
  })
  .then((data) => {
    profileNameEl.textContent = data.name;
    profileDescriptionEl.textContent = data.about;
    disableButton(editProfileSubmitBtn, settings);
    closeModal(editProfileModal);
  })
  .catch(console.error);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  setBtnText(newPostSubmitBtn, true);

  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  };

  api.implementCard(inputValues)
  .then((data) => {
    const card = getCardElement(data);
    cardList.prepend(card);
    newPostForm.reset();
    disableButton(newPostSubmitBtn, settings);
    closeModal(newPostModal);
  })
  .catch(console.error);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

function handleDeleteCard(cardElement, cardId) {
 selectedCard = cardElement;
 selectedCardId = cardId;
openModal(deletePostModal);
}

function handleDeletePostSubmit(evt) {
  evt.preventDefault();
  setBtnText(deleteSubmitBtn, true, "Delete", "Deleting...");
  api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deletePostModal);
  })
  .catch(console.error);
}


deletePostForm.addEventListener("submit", handleDeletePostSubmit);

const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.currentTarget);
    }
  });
});

function escapeHandler(event) {
if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

enableValidation(settings);

