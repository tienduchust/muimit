import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Roboto;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
