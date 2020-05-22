import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  webRadios: PropTypes.array,
};

const WebRadios = ({ webRadios }) => {
  return (
    <Grid>
      {webRadios.map((webRadio) => (
        <Card key={webRadio.id}>
          <div>
            <WebRadioTitle id={webRadio.id}>{webRadio.title}</WebRadioTitle>
            <p>{webRadio.description}</p>
          </div>
          <WebRadioLogo src={`${webRadio.id}.jpg`} alt={webRadio.title} />
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
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30vh;
`;

const WebRadioTitle = styled.h2`
  color: ${(props) => props.theme[props.id]};
`;

const WebRadioLogo = styled.img`
  max-width: 200px;
`;

const Grid = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin-top: 3rem;
  flex-direction: row;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;

WebRadios.propTypes = propTypes;

export default WebRadios;
