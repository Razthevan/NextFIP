import { useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import WebRadios from "./fipRadio/WebRadios";
import useMetadata from "../../hooks/useMetadata";
import MovingText from "../../components/MovingText";
import MetadataContext from "./fipRadio/metadataContext";
import CurrentlyPlaying from "./fipRadio/CurrentlyPlaying";
import FIP_WEB_RADIOS from "./fipRadio/webRadios.query.graphql";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import PauseTwoToneIcon from "@material-ui/icons/PauseTwoTone";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";

const FipRadio = () => {
  const metadata = useMetadata();
  const audioElementRef = useRef(null);
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
        <MovingText text="Error :" role="heading" />
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

  const playAudio = () => audioElementRef.current.play();
  const pauseAudio = () => audioElementRef.current.pause();
  const togglePlayerStatus = (status) => updateIsPlayerPlaying(status);
  return (
    <MetadataContext.Provider value={metadata}>
      <Container>
        <Grid item sm={6} xs={12}>
          <Grid
            item
            xs={12}
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <a
              target="_blank"
              href="https://www.fip.fr/"
              title="You should definitely give FIP a try"
            >
              <RadioLogo src="/fip.svg" alt={title} />
            </a>
            <Description>{description}</Description>
            <audio
              ref={audioElementRef}
              src={activeWebRadioSource}
              onPlay={() => togglePlayerStatus(true)}
              onPause={() => togglePlayerStatus(false)}
            >
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={1} container alignItems="center" justify="center">
              {isPlayerPlaying ? (
                <PauseTwoToneIcon fontSize="large" onClick={pauseAudio} />
              ) : (
                <PlayArrowTwoToneIcon fontSize="large" onClick={playAudio} />
              )}
            </Grid>
            <Grid xs={1} item container alignItems="center" justify="center">
              <VolumeDown />
            </Grid>
            <Grid xs={8} item container justify="center" alignContent="center">
              <StyledSlider
                min={0}
                max={1}
                step={0.1}
                defaultValue={1}
                onChange={(_, value) => {
                  audioElementRef.current.volume = value;
                }}
                activewebradioid={activeWebRadioId}
              />
            </Grid>
            <Grid xs={1} item container justify="center" alignContent="center">
              <VolumeUp />
            </Grid>
          </Grid>
          <CurrentlyPlaying
            webRadioId={activeWebRadioId}
            isPlayerPlaying={isPlayerPlaying}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <WebRadios
            webRadios={webRadios}
            activeWebRadioId={activeWebRadioId}
            onClick={updateRadioInformationAndPlay}
          />
        </Grid>
      </Container>
    </MetadataContext.Provider>
  );
};

const RadioLogo = styled.img`
  width: 25%;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
`;

const StyledSlider = styled(Slider)`
  > .MuiSlider-rail {
    background-color: ${(props) => props.theme[props.activewebradioid]};
  }
  > .MuiSlider-track {
    background-color: ${(props) => props.theme[props.activewebradioid]};
  }
  > .MuiSlider-thumb {
    background-color: ${(props) => props.theme[props.activewebradioid]};
  }
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

export default FipRadio;
