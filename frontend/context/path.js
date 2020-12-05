import React, { createContext, useContext, useState, useCallback } from 'react';
import Router, { useRouter } from 'next/router';

export const PathContext = createContext();

export const PathContextProvider = ({ children }) => {
  const { pathname = '/' } = useRouter();
  const [ currentPath, setCurrentPath ] = useState(pathname);

  const updatePath = useCallback((newPath, shallow=false) => {
    setCurrentPath(newPath);
    Router.push({ pathname: newPath }, undefined, { shallow });
    
  }, [ currentPath, setCurrentPath ]);

  const value = {
    currentPath,
    updatePath
  };

  return (
    <PathContext.Provider value={value}>
      { children }
    </PathContext.Provider>
  );
}

export const usePath = () => useContext(PathContext);
