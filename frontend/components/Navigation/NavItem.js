import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SIZES, GROW, COLORS } from '../../style';

const NavItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 ${SIZES.xs};
  &:hover {
    ${GROW}
  }
`;

const StyledA = styled.a`
  flex-grow: 1;
  font-weight: bold;
  display: inline-block;
  text-transform: uppercase;
  &:hover {
    color: ${COLORS.green};
  }
`;

const NavItem = ({ navItem }) => {
  const {
    object,
    slug,
    title,
    url,
    ID,
  } = navItem;

  if (object === 'custom') {
    return (
      <a href={url}>{title}</a>
    );
  }

  if (!slug) {
    return;
  }

  const asString = object === 'page' ? `/${object}/${slug}` : `/${object}/${slug}`;
  const href = object === 'page' ? `/${object}/[slug]` : `/${object}/[slug]`;
  
  return (
    <NavItemWrapper>
      <Link
        as={asString}
        href={href}
      >
        <StyledA>{ navItem.title }</StyledA>
      </Link>
    </NavItemWrapper>
  );
}

export default NavItem;
