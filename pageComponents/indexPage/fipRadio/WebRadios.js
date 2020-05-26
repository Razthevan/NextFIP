import { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  webRadios: PropTypes.array,
  onClick: PropTypes.func,
};

const WebRadios = ({ webRadios, onClick }) => {
  // FIP Metal fails to play
  const filteredWebRadios = useMemo(
    () => webRadios.filter((webRadio) => webRadio.id !== "FIP_METAL"),
    [webRadios]
  );
  return (
    <Grid>
      {filteredWebRadios.map((webRadio) => (
        <Card key={webRadio.id}>
          <div>
            <WebRadioTitle id={webRadio.id}>{webRadio.title}</WebRadioTitle>
            <WebRadioDescription>{webRadio.description}</WebRadioDescription>
          </div>
          <WebRadioLogo
            src={`${webRadio.id}.jpg`}
            alt={webRadio.title}
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              onClick(webRadio.liveStream, webRadio.id);
            }}
          />
        </Card>
      ))}
    </Grid>
  );
};

const Card = styled.div`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1rem;
  text-align: left;
  color: inherit;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WebRadioTitle = styled.h2`
  color: ${(props) => props.theme[props.id]};
`;

const WebRadioDescription = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

const WebRadioLogo = styled.img`
  max-width: 200px;
  &:hover {
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin-top: 3rem;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

WebRadios.propTypes = propTypes;

export default WebRadios;
