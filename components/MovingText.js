import styled, { withTheme } from "styled-components";

const MovingText = ({ text, role, theme }) => (
  <SpanContainer aria-label={text} role={role} theme={theme}>
    {text.split("").map(function (char, index) {
      let style = { animationDelay: 0.5 + index / 10 + "s" };
      return (
        <span aria-hidden="true" key={index} style={style}>
          {char}
        </span>
      );
    })}
  </SpanContainer>
);

const SpanContainer = styled.span`
  font-size: 30px;
  font-weight: 800;
  span {
    opacity: 0;
    margin: 2px;
    bottom: -2em;
    cursor: default;
    position: relative;
    color: ${(props) => props.theme.FIP};
    animation: move-text 0.75s forwards;
    animation-iteration-count: 100;
  }
  span:nth-child(2n) {
    color: ${(props) => {
      props.theme.FIP_POP;
    }};
  }
  span:nth-child(3n) {
    color: ${(props) => props.theme.FIP_ROCK};
  }
  span:nth-child(4n) {
    color: ${(props) => props.theme.FIP_JAZZ};
  }
  span:nth-child(5n) {
    color: ${(props) => props.theme.FIP_WORLD};
  }
  span:nth-child(6n) {
    color: ${(props) => props.theme.FIP_REGGAE};
  }
  span:nth-child(7n) {
    color: ${(props) => props.theme.FIP_GROOVE};
  }
  span:nth-child(8n) {
    color: ${(props) => props.theme.FIP_ELECTRO};
  }
  span:nth-child(9) {
    color: ${(props) => props.theme.FIP_NOUVEAUTES};
  }
  @keyframes move-text {
    0% {
      bottom: -0.1em;
      opacity: 1;
    }

    50% {
      bottom: 0.1em;
      opacity: 1;
    }

    100% {
      bottom: 0;
      opacity: 1;
    }
  }
`;

// Props to https://fossheim.io/writing/posts/react-text-splitting-animations/

export default withTheme(MovingText);
