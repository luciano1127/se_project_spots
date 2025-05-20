const EditProfileBtn = document.querySelector(".profile__edit-btn");
const EditProfileModal = document.querySelector("#edit-profile-modal");
const EditProfileCloseBtn = EditProfileModal.querySelector(".modal__close-btn");

EditProfileBtn.addEventListener("click", function () {
  EditProfileModal.classList.add("modal_is-opened");
});

EditProfileCloseBtn.addEventListener("click", function () {
  EditProfileModal.classList.remove("modal_is-opened");
});

const NewPostBtn = document.querySelector(".profile__add-btn");
const NewPostModal = document.querySelector("#new-post-modal");
const NewPostCloseBtn = NewPostModal.querySelector(".modal__close-btn");

NewPostBtn.addEventListener("click", function () {
  NewPostModal.classList.add("modal_is-opened");
});

NewPostCloseBtn.addEventListener("click", function () {
  NewPostModal.classList.remove("modal_is-opened");
});
