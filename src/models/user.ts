// auth response object
export interface UserProfileResInt {
  user: {
    id: number;
    userEmail: string;
    userNickname: string;
  };
}

// edit user profile
// TODO: interface and enum will have additional editable fields added
export interface EditProfileReqInt {
  userNickname: string;
}

export enum EditProfileFormEnum {
  nickname = "userNickname",
}

// change password
export enum ChangePasswordInputsEnum {
  new = "new-password-input",
  ver = "verify-password-input",
  curr = "current-password-input",
}
