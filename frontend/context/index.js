import React from 'react';
import { PathContextProvider } from './path';
import { ParamsContextProvider } from './params';
import { ScrollContextProvider } from './scroll';
import { ResizeContextProvider } from './resize';

const Context = ({ children }) => (
  <ResizeContextProvider>
    <ScrollContextProvider>
      <PathContextProvider>
        <ParamsContextProvider>
          { children }
        </ParamsContextProvider>
      </PathContextProvider>
    </ScrollContextProvider>
  </ResizeContextProvider>
);

export default Context;
