import YouTube from "react-youtube";
import styled from "styled-components";

const VideoComponent = ({ youTubeId }) => {
  if (!youTubeId) {
    return <FullWidthDiv noResult />;
  }
  return (
    <>
      <p>* This is a WIP feature. Video result might not be accurate.</p>
      <FullWidthDiv>
        <YouTube videoId={youTubeId} opts={opts} />
      </FullWidthDiv>
    </>
  );
};

export default VideoComponent;

const FullWidthDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  min-height: 420px;
  border: ${(props) => (props.noResult ? null : "5px solid #ff0000")};
`;

const opts = {
  width: "100%",
  height: "400px",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
  },
};
