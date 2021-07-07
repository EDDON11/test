import {
    FormValidator
}
from './components/FormValidator.js';
import Card from './components/Card.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import {
    initialCards,
    profileNameSelector,
    profileJobSelector,
    buttonEditPopup,
    buttonAddPopup,
    popupFormEdit,
    popupFormAdd,
    nameInput,
    jobInput,
    popupSelectorEdit,
    popupSelectorAdd,
    popupPhoto,
    elements,
    elementsTeamplate
}
from './utils/const.js'
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import './pages/index.css';
const obj = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
});
const profile = new UserInfo({
    profileJobSelector,
    profileNameSelector
});
const newFormEdit = new FormValidator(obj, popupFormEdit);
newFormEdit.enableValidation();
const newFormAdd = new FormValidator(obj, popupFormAdd);
newFormAdd.enableValidation();
const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card(data, elementsTeamplate, handleCardClick)
        const elementCard = card.renderCard();
        cardList.addItem(elementCard);
    }
}, elements);
cardList.renderItems()

function createCard(data) {
    const card = new Card(data, elementsTeamplate, (name, link) => {
        popupWithImage.openPopup(name, link)
    });
    const elementCard = card.renderCard();
    return elementCard;
}
const popupWithImage = new PopupWithImage(popupPhoto);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.openPopup(name, link);
}
const popupAddForm = new PopupWithForm({
    popupSelector: popupSelectorAdd,
    handleFormSubmit: (formData) => {
        cardList.addItemPrepend(createCard(formData));
    },
});
const popupEditForm = new PopupWithForm({
    popupSelector: popupSelectorEdit,
    handleFormSubmit: (formData) => {
        profile.setUserInfo(formData);
    },
});
buttonEditPopup.addEventListener("click", () => {
    popupEditForm.openPopup();
    const inputValue = profile.getUserInfo();
    nameInput.value = inputValue.name;
    jobInput.value = inputValue.job;
});
buttonAddPopup.addEventListener("click", () => {
    popupAddForm.openPopup();
});
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();