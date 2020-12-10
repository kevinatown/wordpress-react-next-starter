import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { usePath } from './path';

export const ParamsContext = createContext();

export const ParamsContextProvider = ({ children }) => {
  const { query = {} } = useRouter();
  const { currentPath: pathname } = usePath();
  const [ params, setParams ] = useState(query);

  useEffect(() => {
    if (query !== params) {
      setParams(query);
    }
  },[
    params,
    setParams,
    query,
  ]);
  
  const updateParams = useCallback((newParams, shallow=false) => {
    const np = { ...params, ...newParams };
    
    setParams(np);

    Router.push({ pathname, query: np }, undefined, { shallow });

  }, [ pathname, params, setParams ]);

  const value = {
    updateParams,
    params
  };

  return (
    <ParamsContext.Provider value={value}>
      { children }
    </ParamsContext.Provider>
  );
}

export const useParams = () => useContext(ParamsContext);
