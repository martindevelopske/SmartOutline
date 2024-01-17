export const useLocalStorage = () => {
  const addToLocalStorage = async (key: string, value: string | object) => {
    if (typeof value === "object") {
      await localStorage.setItem(key, JSON.stringify(value));
    } else {
      await localStorage.setItem(key, value);
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
