import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
	transition: all 0.50s linear;
	padding: 0;
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
	box-sizing: border-box;
}
`;

export default GlobalStyle;
