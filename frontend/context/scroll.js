import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const ScrollContext = createContext();

export const ScrollContextProvider = ({ children }) => {
  const [ scrollEventListener, setScrollEventListener ] = useState();
  const [ clientHeight, setClientHight ] = useState(0);
  const [ scrollHeight, setScrollHeight ] = useState(0);
  
  const updateScrollHeight = useCallback(() => {
    setScrollHeight(document?.documentElement?.scrollTop);
  }, [ setScrollHeight ]);

  useEffect(() => {
    setScrollHeight(document?.documentElement?.scrollTop);

    if (!scrollEventListener) {
      setScrollEventListener(document?.addEventListener('scroll', () => {
        setScrollHeight(document?.documentElement?.scrollTop);
        setClientHight(document?.documentElement?.clientHeight);
      }));
    }

    return () => {
      if (scrollEventListener) {
        document?.removeEventListener(scrollEventListener);
      }
    }
  },[
    setScrollHeight,
    setScrollEventListener,
    scrollEventListener,
    setClientHight
  ]);

  const value = {
    scrollHeight,
    clientHeight
  };

  return (
    <div onScroll={updateScrollHeight}>
      <ScrollContext.Provider value={value}>
        { children }
      </ScrollContext.Provider>
    </div>
  );
}

export const useScroll = () => useContext(ScrollContext);
