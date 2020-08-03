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
        <YouTube
          videoId={youTubeId}
          opts={opts}
          containerClassName="youtubeContainer"
        />
      </FullWidthDiv>
    </>
  );
};

export default VideoComponent;

const FullWidthDiv = styled.div`
  width: 100%;
  margin-top: 10px;

  .youtubeContainer {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
    margin-bottom: 50px;
  }

  .youtubeContainer iframe {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
  },
};
