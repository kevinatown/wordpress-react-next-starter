import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const LayoutWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 30% 30% 30%;
  grid-template-areas:
    "header  header  header"
    "content content content"
    "footer  footer  footer";
  background-color: #fff;
  color: #444;
`;

const HeaderWrapper = styled.header`
  grid-area: header;
`;

const ContentWrapper = styled.main`
  grid-area: content;
`;

const FooterWrapper = styled.footer`
  grid-area: footer;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <HeaderWrapper>
        <h1> TBD </h1>
      </HeaderWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
