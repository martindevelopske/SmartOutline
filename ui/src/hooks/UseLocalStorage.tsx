export const UseLocalStorage = () => {
  const addToLocalStorage = (key: string, value: string | object) => {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  };
  const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key);
  };
  return { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
};
