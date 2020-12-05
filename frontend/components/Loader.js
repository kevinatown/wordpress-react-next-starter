import React from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS, SIZES } from '../style';

const ContentEndWrapper = styled.div`
  font-weight: 900;
  font-size: ${SIZES.m};
  text-align: center;
  cursor: default;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  span:nth-child(even) {
    color: ${COLORS.green};
  }
`;

const Frames1 = keyframes`
  0% {
      transform: scale(0);
  }
    100% {
      transform: scale(1);
    }
`;

const Frames2 = keyframes`
  0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
`;

const Frames3 = keyframes`
   0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    position: absolute;
    top: 33px;
    width: ${SIZES.xs};
    height: ${SIZES.xs};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  & div:nth-child(odd) {
    background-color: ${COLORS.magenta};
  }

  & div:nth-child(even) {
    background-color: ${COLORS.green};
  }
  
  & div:nth-child(1) {
    left: 8px;
    animation: ${Frames1} 0.6s infinite;
  }
  
  & div:nth-child(2) {
    left: 8px;
    animation: ${Frames2} 0.6s infinite;
  }
  
  & div:nth-child(3) {
    left: 32px;
    animation: ${Frames2} 0.6s infinite;
    z-index: 2;
  }
  
  & div:nth-child(4) {
    left: 56px;
    animation: ${Frames3} 0.6s infinite;
    z-index: 1;
  }
`;

const Loader = () => (
  <LoaderWrapper>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </LoaderWrapper>
);

export default Loader;
