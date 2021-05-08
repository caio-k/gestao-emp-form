import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fonts.family.montserrat};
    background: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 15px;
  }
  #root {
    color: ${props => props.theme.colors.gray400};
    background: ${props => props.theme.colors.background};
    font-family: ${props => props.theme.fonts.family.montserrat};
    p {
      font-size: 1rem;
      line-height: 1.86rem;
      margin: 0.8125rem 0;
      padding: 0;
      font-weight: 600;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: ${props => props.theme.fonts.family.montserrat};
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 200;
    }
    h2 {
      font-size: 2rem;
      font-weight: 300;
    }
    h3 {
      font-size: 1.75rem;
      font-weight: 300;
    }
    h4 {
      font-size: 1.5rem;
      font-weight: medium;
    }
    h5 {
      font-size: 1.25rem;
      font-weight: 600;
    }
    h6 {
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;

export default GlobalStyle;
