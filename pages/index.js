import Head from "next/head";
import dynamic from "next/dynamic";
import apolloClient from "../graphql/client";
import { ApolloProvider } from "@apollo/react-hooks";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../components/GlobalStyle";
import IndexPage from "../pageComponents/IndexPage";
import {
  GithubIcon,
  GraphQLIcon,
  LinkedInIcon,
} from "../components/socialIcons/index";

// const ChromecastButton = dynamic(
//   () => import("../components/ChromecastButton"),
//   { ssr: false }
// );

import { lightTheme, darkTheme } from "../components/theme";
import useDarkTheme, { LIGHT_THEME } from "../hooks/useDarkTheme";

const App = () => {
  const [themeMode, toggleThemeMode] = useDarkTheme();
  const isLightTheme = themeMode === LIGHT_THEME;
  const theme = isLightTheme ? lightTheme : darkTheme;

  return (
    <Container>
      <Head>
        <title>Eclectic</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="description"
          content="FIP Radio Next.JS & GraphQL implementation"
        ></meta>
        {/* <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script> */}
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <StickyHeader>
            <SocialLinks>
              <FlexLink
                rel="noopener"
                target="_blank"
                href="https://www.linkedin.com/in/r%C4%83zvan-m%C3%AErleneanu-2a8307135/"
              >
                <LinkedInIcon />
              </FlexLink>
              <FlexLink
                rel="noopener"
                target="_blank"
                href="https://github.com/Razthevan/spotifip"
              >
                <GraphQLIcon />
              </FlexLink>
              <FlexLink
                rel="noopener"
                target="_blank"
                href="https://github.com/Razthevan/NextFIP"
              >
                <GithubIcon />
              </FlexLink>
              <ThemeSwitcher onClick={toggleThemeMode}>
                {isLightTheme ? "☀️" : "🌙"}
              </ThemeSwitcher>
            </SocialLinks>
          </StickyHeader>
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
  margin: 10px;
  cursor: pointer;
`;

const SocialLinks = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StickyHeader = styled.div`
  top: 10px;
  width: auto;
  position: sticky;
  display: flex;
  justify-content: flex-end;
`;

const FlexLink = styled.a`
  margin: 10px;
  display: flex;
  align-items: center;
`;

export default App;
