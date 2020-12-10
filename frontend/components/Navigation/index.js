import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Router from 'next/router';
import Config from '../../config';
import NavItem from './NavItem';
import { SIZES, COLORS } from '../../style';
import { useScroll } from '../../context/scroll';
import { useResize } from '../../context/resize';
import Icons from '../../icons';

const MenuWrapper = styled.div`
  padding: ${({isSmall, isMobile}) => isSmall && !isMobile ? SIZES.xs : '0'} 0;
  display: flex;
  flex-direction: column;
  align-items: ${({isSmall, isMobile}) => isSmall && !isMobile ? 'flex-end' : 'center'};
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Seperator = styled.span`
  color: ${COLORS.red};
  font-weight: 900;
  cursor: default;
`;

const SocailWrapper = styled.div`
  display: flex;
  ${({isSmall, isMobile}) =>
    !isSmall ?
      css`margin-bottom: ${SIZES.xs};` :
      css`margin-right: 0.5rem;`
  }
`;

const SocaialLink = styled.a`
  margin: 0 ${({isSmall, isMobile}) => isSmall ?
    isMobile ? `${SIZES.xs} ${SIZES.s}` : `${SIZES.xs} 0.5rem` : `${SIZES.xs}` };
`;

const Navigation = ({ menu, isMobile }) => {
  const { scrollHeight } = useScroll();

  const navItems = [];
  
  menu && menu.items.forEach((item, idx) => {
    navItems.push(<NavItem
      key={`${item.slug}_${item.ID}`}
      navItem={item}
    />);

    if (idx < menu.items.length - 1) {
      navItems.push(<Seperator key={`sep_${item.ID}`}>/</Seperator>);
    }
  })

  const isSmall = scrollHeight > 50;
  
  return (
    <MenuWrapper isSmall={isSmall} isMobile={isMobile}>
      <SocailWrapper isSmall={isSmall}>
        {
          Icons.map(({ icon, name, link }) => 
            <SocaialLink
              isMobile={isMobile}
              isSmall={isSmall}
              target="_blank"
              key={name}
              href={link}>
                { React.createElement(icon, { isMobile }, null) }
            </SocaialLink>
          )
        }
      </SocailWrapper>
      <MenuContainer>
        { navItems }
      </MenuContainer>
    </MenuWrapper>
  );
}

export default Navigation;
