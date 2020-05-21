import Head from "next/head";
import apolloClient from "../graphql/client";
import { ApolloProvider } from "@apollo/react-hooks";
import styled, { ThemeProvider } from "styled-components";

import IndexPage from "../pageComponents/IndexPage";
import GlobalStyle from "../components/GlobalStyle";

import { lightTheme, darkTheme } from "../components/theme";
import useDarkTheme, { LIGHT_THEME } from "../hooks/useDarkTheme";

const App = () => {
  const [themeMode, toggleThemeMode] = useDarkTheme();
  const isLightTheme = themeMode === LIGHT_THEME;
  const theme = isLightTheme ? lightTheme : darkTheme;

  return (
    <Container>
      <Head>
        <title>NextFIP</title>
        <link rel="icon" href="/fip.svg" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <ThemeSwitcherContainer>
            <ThemeSwitcher onClick={toggleThemeMode}>
              {isLightTheme ? "☀️" : "🌙"}
            </ThemeSwitcher>
          </ThemeSwitcherContainer>
          <GlobalStyle />
          <IndexPage />
        </ThemeProvider>
      </ApolloProvider>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
`;
const ThemeSwitcher = styled.span`
  position: relative;
  cursor: pointer;
`;

const ThemeSwitcherContainer = styled.div`
  position: fixed;
  right: 30px;
  top: 10px;
`;
export default App;
