import Head from "next/head";
import apolloClient from "../graphql/client";
import { ApolloProvider } from "@apollo/react-hooks";
import styled, { ThemeProvider } from "styled-components";

import GithubIcon from "../components/GithubIcon";
import GlobalStyle from "../components/GlobalStyle";
import IndexPage from "../pageComponents/IndexPage";
import LinkedInIcon from "../components/LinkedInIcon";

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
          <FixedContainer>
            <RelativeDiv>
              <FlexLink
                target="_blank"
                href={
                  "https://www.linkedin.com/in/r%C4%83zvan-m%C3%AErleneanu-2a8307135/"
                }
              >
                <LinkedInIcon />
              </FlexLink>
              <FlexLink
                target="_blank"
                href={"https://github.com/Razthevan/NextFIP"}
              >
                <GithubIcon />
              </FlexLink>

              <ThemeSwitcher onClick={toggleThemeMode}>
                {isLightTheme ? "☀️" : "🌙"}
              </ThemeSwitcher>
            </RelativeDiv>
          </FixedContainer>
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
  cursor: pointer;
`;

const RelativeDiv = styled.div`
  display: flex;
  min-width: 100px;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const FixedContainer = styled.div`
  top: 10px;
  right: 30px;
  position: fixed;
`;

const FlexLink = styled.a`
  display: flex;
  align-items: center;
`;

export default App;
