import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const ResizeContext = createContext();

export const ResizeContextProvider = ({ children }) => {
  const [ resizeEventListener, setResizeEventListener ] = useState();
  const [ windowHeight, setWindowHeight ] = useState(0);
  const [ windowWidth, setWindowWidth ] = useState(0);

  useEffect(() => {
    setWindowHeight(window?.innerHeight || document?.documentElement?.clientHeight);
    setWindowWidth(window?.innerWidth || document?.documentElement?.clientWidth);
    
    if (!resizeEventListener) {
      setResizeEventListener(window?.addEventListener('resize', () => {
        setWindowHeight(window?.innerHeight || document?.documentElement?.clientHeight);
        setWindowWidth(window?.innerWidth || document?.documentElement?.clientWidth);
      }));
    }

    return () => {
      if (resizeEventListener) {
        window?.removeEventListener(resizeEventListener);
      }
    }
  },[
    setWindowHeight,
    setWindowWidth,
    setResizeEventListener,
    resizeEventListener
  ]);

  const value = {
    windowHeight,
    windowWidth
  };

  return (
    <ResizeContext.Provider value={value}>
      { children }
    </ResizeContext.Provider>
  );
}

export const useResize = () => useContext(ResizeContext);
