import { withTheme } from "styled-components";

export const LeftArrow = withTheme(({ theme }) => (
  <svg
    id="i-chevron-left"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="48"
    height="48"
    fill="none"
    fill={theme.text}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M20 30 L8 16 20 2" />
  </svg>
));

export const RightArrow = withTheme(({ theme }) => (
  <svg
    id="i-chevron-right"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="48"
    height="48"
    fill="none"
    fill={theme.text}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M12 30 L24 16 12 2" />
  </svg>
));
