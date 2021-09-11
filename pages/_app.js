import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  color: white;
  text-decoration: none;
  outline: none;
}

body {
  display: flex;
  flex-direction: column;
  background-color: #3b3b3b;
}

input, ::selection, option {
  color: #3b3b3b;
}

`;

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
