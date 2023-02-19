export interface StorageDataInt {
  userId: string;
  token: string;
}

const checkLocalStorage = () => {
  const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
  if (Object.keys(storageData).length && storageData.userId && storageData.token) return true;
  return false;
};

export default checkLocalStorage;

// useEffect(() => {
//   // capture storage data each page refresh
//   const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
//   // do nothing if all storage data present
//   if (Object.keys(storageData).length && storageData.userId && storageData.token) return;
//   // otherwise check auth status and redirect as needed
//   else navigate("/login");
//   // invoke each time a change is made to auth.isLoggedIn
// }, [auth.isLoggedIn]);
