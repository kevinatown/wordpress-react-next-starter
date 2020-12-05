import React from 'react';
import styled, { css } from 'styled-components';
import { SIZES, COLORS } from '../style';


// 
// TODO: FIX annimation open.
// 
const MenuButton = styled.button`
  z-index: 2;
  display: inline-block;
  cursor: pointer;
  background-color: none;
  overflow: hidden;
  background-color: ${COLORS.white};
  border-radius: 2px;
  border: none;

  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  
  & span {
    width: 2rem;
    height: 1.25rem;
    display: inline-block;
    position: relative;

    span {
      display: block;
      top: 50%;

      &,
      &::before,
      &::after {
        width: 2em;
        height: 0.25em;
        background-color: ${COLORS.red};
        position: absolute;
        transition-property: transform;
        transition-duration: 0.15s;
        transition-timing-function: ease;
      }

      &::before,
      &::after {
        content: "";
        display: block;
      }

      &::before {
        top: calc(0.5rem * -1);
      }

      &::after {
        bottom: calc(0.5rem * -1);
      }

      
      transition-duration: 0.13s;
      transition-delay: 0.13s;
      transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

      &::after {
        transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
                    opacity 0.1s linear;
      }

      &::before {
        transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
                    transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
    }
  }

  ${({ menuOpened }) => 
    menuOpened && css`

    & span {
        span {
          top: auto;
          bottom: -9px;
          transform: translate3d(0, calc(1rem * -1), 0) rotate(-45deg);
          transition-delay: 0.22s;
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          &::after {
            top: 0;
            opacity: 0;
            transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                        opacity 0.1s 0.22s linear;
          }

          &::before {
            top: 0;
            transform: rotate(-90deg);
            transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                        transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
          }
        }
      }
    `
  }
`;

export default MenuButton;

