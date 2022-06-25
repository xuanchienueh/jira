import { useEffect, useState } from "react";

function debounce(func, wait) {
  let timeout;

  return function () {
    let context = this,
      args = arguments;

    let executeFunction = function () {
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
  };
}
export default debounce;

//------
function useDebounce(value, delay) {
  const [valueDebounce, setValueDebounce] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setValueDebounce(value), delay);

    return () => clearTimeout(timerId);
  }, [value]);
  return valueDebounce;
}

export { useDebounce };
