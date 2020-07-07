import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  song: PropTypes.object,
  webRadioId: PropTypes.string,
};

const CurrentlyPlayingInformation = ({ webRadioId, song }) => {
  return (
    <>
      <p>
        Currently playing{" "}
        <TrackTitle id={webRadioId}>{song?.track?.title}</TrackTitle> by
        {song?.track?.mainArtists?.map((artist) => (
          <span key={artist}> {artist}</span>
        ))}{" "}
        on{" "}
        <WebRadioName id={webRadioId}>
          {convertWebRadioIdToName(webRadioId)}
        </WebRadioName>
      </p>
    </>
  );
};

const convertWebRadioIdToName = (webRadioId) =>
  webRadioId.toLowerCase().split("_").join(" ");

const WebRadioName = styled.span`
  color: ${(props) => props.theme[props.id]};
  text-transform: capitalize;
`;

const TrackTitle = styled.span`
  color: ${(props) => props.theme[props.id]};
`;

CurrentlyPlayingInformation.propTypes = propTypes;

export default CurrentlyPlayingInformation;
