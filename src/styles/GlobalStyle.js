import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0 !important;
    font-family: 'Montserrat', 'Roboto', sans-serif;;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  body {
    background: #f5f7f9;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, ans-serif;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  a {
    text-decoration: none !important;
  }

  .clearfix {
    clear: both;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }
`;

export default GlobalStyle;
