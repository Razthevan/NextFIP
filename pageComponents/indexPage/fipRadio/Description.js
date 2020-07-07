import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

const Description = ({ title, description }) => (
  <>
    <a
      rel="noopener"
      target="_blank"
      href="https://www.fip.fr/"
      title="You should definitely give FIP a try"
    >
      <RadioLogo src="/fip.svg" alt={title} />
    </a>
    <AboutText>{description}</AboutText>
  </>
);

const AboutText = styled.p`
  cursor: default;
  font-size: 18px;
  margin-bottom: 10px;
`;

const RadioLogo = styled.img`
  width: 25%;
  margin-bottom: 10px;
`;

Description.propTypes = propTypes;

export default Description;
