import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
	overflow: hidden;
	transition: all 0.50s linear;
  	color: ${({ theme }) => theme.text};
  	background: ${({ theme }) => theme.body};
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
`;

export default GlobalStyle;
