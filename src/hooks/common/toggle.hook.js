import { useState } from "react";

/**
 * Returns a boolean state and a simple toggle function.
 * @param {boolean} defaultValue Default state value.
 * @returns {[value: boolean, toggle: () => void]}
 */
const useToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
}

export default useToggle;