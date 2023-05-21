export enum FormIdsEnum {
  reg = "register-user-form",
  login = "login-user-form",
  newTask = "new-subtask-form",
  editTask = "edit-subtask-form",
  newList = "new-list-form",
  editList = "edit-list-form",
}

export enum InputIdsEnum {
  regEmail = "register-email-input",
  regName = "register-nickname-input",
  regPass = "register-password-input",
  regConfirm = "register-confirm-password-input",
  loginEmail = "login-email-input",
  loginPass = "login-password-input",
  newListName = "new-list-name-input",
  newListType = "new-list-type-select",
  editListName = "edit-list-name-input",
}

export enum FormErrorsEnum {
  email = "Please enter a valid email address.",
  nickname = "Nickname exceeds max length (24).",
  passLength = "Please enter a longer password (min 8)",
  passConfirm = "Password confirmation does not match.",
  name = "Please enter a name 1-24 characters long.",
}
