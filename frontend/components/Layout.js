import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Headr from './Head';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import { COLORS } from '../style';
import { useScroll } from '../context/scroll';

const LayoutWrapper = styled.div`
  background-color: ${COLORS.light_grey};
  color: ${COLORS.black};
`;

const HeaderWrapper = styled.div`
  grid-area: header;
  position: fixed;
  z-index: 2;
  transition: 0.2s;
  ${ ({scrollHeight}) =>
    scrollHeight > 50 ?
      css`
        left: 0;
        right: 0;
        top: 0;
      ` :
      css`
        left: 10%;
        top: 10%;
      `
  }
`;

const ContentWrapper = styled.main`
  grid-area: content;
  position: relative;
`;

const FooterWrapper = styled.div`
  grid-area: footer;
`;


const Layout = ({ children, menu, metaData }) => {
  const { scrollHeight } = useScroll();

  return (
    <div>
      <Headr metaData={metaData} />    
      <LayoutWrapper>
        <ContentWrapper>
          <HeaderWrapper scrollHeight={scrollHeight}>
            <Header menu={menu} />
          </HeaderWrapper>
          { children }
        </ContentWrapper>
      </LayoutWrapper>
    </div>
  );
};

export default Layout;
