import React from 'react';
import styled from 'styled-components';
import { COLORS, SIZES } from '../style';

const ContentEndWrapper = styled.div`
  font-weight: 900;
  font-size: ${SIZES.m};
  text-align: center;
  cursor: default;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  color: ${COLORS.magenta};
  span:nth-child(even) {
    color: ${COLORS.green};
  }
`;

const ContentEnd = () => (
  <ContentEndWrapper>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </ContentEndWrapper>
);

export default ContentEnd;
