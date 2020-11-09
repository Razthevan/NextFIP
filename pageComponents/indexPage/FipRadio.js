import styled from "styled-components";
import { useRef, useState, lazy, Suspense } from "react";
import { useQuery } from "@apollo/react-hooks";

import WebRadios from "./fipRadio/WebRadios";
import Description from "./fipRadio/Description";
import useMetadata from "../../hooks/useMetadata";
import MovingText from "../../components/MovingText";
import VideoComponent from "./fipRadio/VideoComponent";
import PlayerControls from "./fipRadio/PlayerControls";
import MetadataContext from "./fipRadio/metadataContext";
import FIP_WEB_RADIOS from "./fipRadio/webRadios.query.graphql";

import Grid from "@material-ui/core/Grid";

const CurrentlyPlaying = lazy(() => import("./fipRadio/CurrentlyPlaying"));

const FipRadio = () => {
  const metadata = useMetadata();
  const audioElementRef = useRef(null);
  const [volume, setVolume] = useState(0.3);
  const [loading, updateLoadingStatus] = useState(true);
  const [activeWebRadioId, setActiveWebRadioId] = useState(null);
  const [isPlayerPlaying, updateIsPlayerPlaying] = useState(false);
  const [activeWebRadioSource, setActiveWebRadioSource] = useState(null);

  const updateWebRadioInformation = (activeWebRadioSource, webRadioId) => {
    setActiveWebRadioSource(activeWebRadioSource);
    setActiveWebRadioId(webRadioId);
  };

  const updateLoadingStatusTimeout = (status) => {
    const loadingTimeout = setTimeout(() => {
      updateLoadingStatus(status);
    }, 3000);
    return () => clearTimeout(loadingTimeout);
  };

  const { error, data } = useQuery(FIP_WEB_RADIOS, {
    onCompleted: (data) => {
      const { webRadios } = data.brand;
      const fipJazz = webRadios.find((webRadio) => webRadio.id === "FIP_JAZZ");
      updateLoadingStatusTimeout(false);
      updateWebRadioInformation(fipJazz.liveStream, fipJazz.id);
    },
  });

  if (loading) {
    return (
      <Container>
        <MovingText text="LOADING..." role="heading" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <MovingText text="ERROR :(" role="heading" />
      </Container>
    );
  }
  const { title, description, webRadios } = data.brand;

  const updateRadioInformationAndPlay = (activeWebRadioSource, webRadioId) => {
    updateWebRadioInformation(activeWebRadioSource, webRadioId);
    // TODO: Investigate why this is needed.
    const playAudioTimeout = setTimeout(() => {
      playAudio();
    }, 1);
    return () => clearTimeout(playAudioTimeout);
  };

  const playAudio = () => {
    audioElementRef.current.volume = volume;
    audioElementRef.current.play();
  };
  const pauseAudio = () => audioElementRef.current.pause();
  const togglePlayerStatus = (status) => updateIsPlayerPlaying(status);
  const onVolumeChange = (_, value) => {
    audioElementRef.current.volume = value;
    setVolume(value);
  };

  return (
    <MetadataContext.Provider value={metadata}>
      <Container>
        <Grid item sm={6} xs={12} container>
          <Row>
            <Description title={title} description={description} />
          </Row>

          <Row>
            <audio
              ref={audioElementRef}
              src={activeWebRadioSource}
              onPlay={() => togglePlayerStatus(true)}
              onPause={() => togglePlayerStatus(false)}
            >
              Your browser does not support the
              <code>audio</code> element.
            </audio>

            <PlayerControls
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              onVolumeChange={onVolumeChange}
              isPlayerPlaying={isPlayerPlaying}
              activeWebRadioId={activeWebRadioId}
            />
          </Row>
          <Row>
            <CurrentlyPlayingContainer>
              {isPlayerPlaying && (
                <Suspense fallback={<></>}>
                  <CurrentlyPlaying
                    webRadioId={activeWebRadioId}
                    isPlayerPlaying={isPlayerPlaying}
                  />
                </Suspense>
              )}
            </CurrentlyPlayingContainer>
          </Row>
        </Grid>
        <Grid item sm={6} xs={12}>
          <WebRadios
            webRadios={webRadios}
            isPlayerPlaying={isPlayerPlaying}
            playingWebRadioId={activeWebRadioId}
            onClick={updateRadioInformationAndPlay}
          />
        </Grid>
        <Grid item container xs={12}>
          <VideoComponent youTubeId={metadata?.metadata?.youTubeId} />
        </Grid>
      </Container>
    </MetadataContext.Provider>
  );
};

const CurrentlyPlayingContainer = styled.div`
  min-height: 110px;
  width: 100%;
`;

const Container = ({ children }) => (
  <Grid container direction="row" alignItems="center" justify="center">
    <Grid
      item
      container
      md={8}
      sm={12}
      spacing={1}
      wrap="wrap"
      direction="row"
      alignItems="center"
    >
      {children}
    </Grid>
  </Grid>
);

const Row = ({ children }) => (
  <Grid
    item
    xs={12}
    container
    spacing={1}
    alignItems="center"
    justify="space-between"
  >
    {children}
  </Grid>
);

export default FipRadio;
