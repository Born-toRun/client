import { useState } from "react";

export const useModal = () => {
  const [isActive, setIsActive] = useState(false);

  const close = () => {
    setIsActive(false);
  };

  const open = () => {
    setIsActive(true);
  };

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  return {
    isActive,
    close,
    open,
    toggle,
  };
};
