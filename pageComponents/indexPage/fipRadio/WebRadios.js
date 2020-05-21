import styled from "styled-components";

const WebRadios = ({ webRadios }) => {
  return (
    <Grid>
      {webRadios.map((webRadio) => (
        <Card key={webRadio.id}>
          <h2>{webRadio.title}</h2>
          <p>{webRadio.description}</p>
        </Card>
      ))}
    </Grid>
  );
};

const Card = styled.div`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: default;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: end;

  &:hover,
  &:focus,
  &:active {
    color: #a90042;
    border-color: #a90042;
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;

export default WebRadios;
