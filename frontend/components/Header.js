import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Navigation from './Navigation';
import { SIZES, COLORS } from '../style';
import { useScroll } from '../context/scroll';
import { useResize } from '../context/resize';
import MenuButton from './MenuButton';

const HeaderWrapper = styled.header`
  box-shadow: rgb(23 26 33 / 40%) 0px 2px 5px 3px;
  display: flex;
  justify-content: space-between;
  padding: ${({ isSticky }) => isSticky ? 0 : SIZES.s} ${SIZES.xs};
  align-items: center;
  background-color: ${COLORS.white};
  transition: 0.2s;
  opacity: ${({ isSticky }) => isSticky ? '100%' : '80%'};
  flex-direction: ${({ isSticky }) => isSticky ? 'row' : 'column'};
`;

const TitleWrapper = styled.div`
  z-index: 2;
`;

const TitleLink = styled.a`
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    color: ${COLORS.green};
  }
`;

const NavWrapper = styled.nav`
  flex-grow: 1;
  display: ${({ isSticky }) => isSticky ? 'none' : 'block'};
  margin-left: ${({ isSticky }) => isSticky ? SIZES.s : '0'};
  @media screen and (min-width:600px) {
    display: block;
  }
  ${({ isMobile }) =>
    isMobile && css`
      display: flex;
      align-items: center;
    `
  }
`;

const StyledTitle = styled.h1`
  font-size: 1.25rem;
  @media screen and (min-width:600px) {
    font-size: ${SIZES.s};
    margin-top: ${({ isSticky }) => isSticky ? '.67em' : '0'};
  }
`;

const MobileMenu = styled.div`
  background-color: ${COLORS.white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  padding-top: ${SIZES.m};
  padding-bottom: ${SIZES.s};
  z-index: 1;
`;

const Header = ({ menu }) => {
  const [ menuOpened, setMenuOpened ] = useState(false);
  
  const { scrollHeight } = useScroll();
  const { windowWidth } = useResize();
  const isMobile = windowWidth < 600;
  const isSticky = scrollHeight > 50;
  const toggleMenu = useCallback(() => setMenuOpened(!menuOpened),[menuOpened, setMenuOpened]);

  useEffect(() => {
    if (!isSticky || !isMobile) {
      setMenuOpened(false);
    }
  }, [ setMenuOpened, isSticky, isMobile ]);

  return (
    <HeaderWrapper isSticky={isSticky}>
      <TitleWrapper>
        <Link href="/" as="/">
          <TitleLink><StyledTitle isSticky={isSticky}>My Blog</StyledTitle></TitleLink>
        </Link>
      </TitleWrapper>
      <NavWrapper isSticky={isSticky}>
        <Navigation menu={menu} />
      </NavWrapper>
      {
        isMobile && isSticky &&
        <MenuButton menuOpened={menuOpened} onClick={toggleMenu} type="button">
          <span>
            <span></span>
          </span>
        </MenuButton>
      }
      {
        menuOpened && 
        <MobileMenu>
          <NavWrapper>
            <Navigation menu={menu} isMobile />
          </NavWrapper>
        </MobileMenu>
      }
    </HeaderWrapper>
  );
}

export default Header;
