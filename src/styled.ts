import styled, { createGlobalStyle } from 'styled-components';
import RubikLight from './assets/fonts/Rubik-Light.ttf';
import RubikRegular from './assets/fonts/Rubik-Regular.ttf';
import RubikMedium from './assets/fonts/Rubik-Medium.ttf';
import RubikSemiBold from './assets/fonts/Rubik-SemiBold.ttf';
import RubikBold from './assets/fonts/Rubik-Bold.ttf';
import RubikExtraBold from './assets/fonts/Rubik-ExtraBold.ttf';
import RubikBlack from './assets/fonts/Rubik-Black.ttf';
import { COLORS } from './constants/utils';
import { NAVBAR_HEIGHT } from './components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  :focus, :active {
    outline: none;
  }

  a:focus, a:active {
    outline: none;
  }

  nav, footer, header, aside {
    display: block;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    font-size: 100%;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  input::-ms-clear {
    display: none;
  }

  input, button, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  a, a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  ul li {
    list-style: none;
  }

  img {
    vertical-align: top;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 300;
    font-style: normal;
    src: url(${RubikLight}) format('truetype');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 400;
    font-style: normal;
    src: url(${RubikRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 500;
    font-style: normal;
    src: url(${RubikMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 600;
    font-style: normal;
    src: url(${RubikSemiBold}) format('truetype');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 700;
    font-style: normal;
    src: url(${RubikBold}) format('truetype');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 800;
    font-style: normal;
    src: url(${RubikExtraBold}) format('truetype');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 900;
    font-style: normal;
    src: url(${RubikBlack}) format('truetype');
  }
`;

export const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLORS.white};
  padding-top: ${NAVBAR_HEIGHT}px;
  font-family: Rubik, sans-serif;
`;

