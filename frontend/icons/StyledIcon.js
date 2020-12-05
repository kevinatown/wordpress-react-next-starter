import React from 'react';
import styled from 'styled-components';
import { SIZES, COLORS } from '../style';

export const StyledIcon = styled.svg`
  height: ${({isMobile}) => isMobile ? '1.5rem' : SIZES.xs};
  width: ${({isMobile}) => isMobile ? '1.5rem' : SIZES.xs};
  stroke: ${COLORS.red};
  fill: ${COLORS.red};
`;
