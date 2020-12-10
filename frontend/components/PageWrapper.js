import React from 'react';
import Context from '../context';

const PageWrapper = Comp => 
  (...props) =>(
    <Context>
      <Comp { ...props[0] } />
    </Context>
  );


export default PageWrapper;
