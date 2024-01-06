export const UseLocalStorage = () => {
  const addToLocalStorage = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    localStorage.setItem(key, value);
  };
  const removeFromLocalStorage = ({ key }: { key: string }) => {
    localStorage.removeItem(key);
  };
  return { addToLocalStorage, removeFromLocalStorage };
};
