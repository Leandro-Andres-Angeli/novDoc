import React, { useState } from 'react';

const useOpenElement = () => {
  const [elementVisible, setElementVisible] = useState(false);
  const handleElementVisibility = (val?: boolean) => {
    setElementVisible(val ?? !elementVisible);
  };
  return { elementVisible, handleElementVisibility };
};

export default useOpenElement;
