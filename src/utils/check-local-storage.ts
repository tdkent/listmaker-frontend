export interface StorageDataInt {
  userId: string;
  userNickname: string;
  token: string;
}

const checkLocalStorage = () => {
  const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
  if (Object.keys(storageData).length && storageData.userId && storageData.token) return true;
  return false;
};

export default checkLocalStorage;
