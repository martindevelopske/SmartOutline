export const UseLocalStorage = () => {
  const addToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  return { addToLocalStorage, removeFromLocalStorage };
};
