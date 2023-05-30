export const checkIsEmail = (email: string): boolean => {
  if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return true;
  return false;
};

export const checkNickname = (nickname: string): boolean => {
  if (nickname.length > 16) return false;
  return true;
};

export const checkPasswordLength = (pw: string): boolean => {
  if (pw.length >= 8) return true;
  return false;
};

export const checkConfirmPassword = (p1: string, p2: string): boolean => {
  if (p1 === p2) return true;
  return false;
};

export const checkNameLength = (name: string): boolean => {
  if (name.length > 1 && name.length <= 24) return true;
  return false;
};

export const checkNameBlank = (name: string): boolean => {
  if (name.length) return true;
  return false;
};
