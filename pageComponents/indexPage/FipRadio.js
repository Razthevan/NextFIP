import { useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import WebRadios from "./fipRadio/WebRadios";
import CurrentlyPlaying from "./fipRadio/CurrentlyPlaying";
import FIP_WEB_RADIOS from "./fipRadio/webRadios.query.graphql";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import PauseTwoToneIcon from "@material-ui/icons/PauseTwoTone";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";

const FipRadio = () => {
  const audioElementRef = useRef(null);

  const [activeWebRadioId, setActiveWebRadioId] = useState(null);
  const [isPlayerPlaying, updateIsPlayerPlaying] = useState(false);
  const [activeWebRadioSource, setActiveWebRadioSource] = useState(null);

  const { loading, error, data } = useQuery(FIP_WEB_RADIOS, {
    onCompleted: (data) => {
      const { webRadios } = data.brand;
      const fipJazz = webRadios.find((webRadio) => webRadio.id === "FIP_JAZZ");
      updateWebRadioInformation(fipJazz.liveStream, fipJazz.id);
    },
  });

  if (loading)
    return (
      <Grid container direction={"row"} alignItems="center" wrap={"wrap"}>
        <Grid item sm={6} xs={12}>
          <p>Loading...</p>
        </Grid>
      </Grid>
    );
  if (error) {
    return (
      <Grid container direction={"row"} alignItems="center" wrap={"wrap"}>
        <Grid item sm={6} xs={12}>
          <p>Error :(</p>
        </Grid>
      </Grid>
    );
  }
  const { title, description, webRadios } = data.brand;

  const updateWebRadioInformation = (activeWebRadioSource, webRadioId) => {
    setActiveWebRadioSource(activeWebRadioSource);
    setActiveWebRadioId(webRadioId);
  };

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
    <Grid container direction={"row"} alignItems="center" wrap={"wrap"}>
      <Grid item sm={6} xs={12}>
        <a
          target="_blank"
          href="https://www.fip.fr/"
          title="You should definitely give FIP a try"
        >
          <RadioLogo src="/fip.svg" alt={title} />
        </a>
        <p>{description}</p>
        <audio
          ref={audioElementRef}
          src={activeWebRadioSource}
          onPlay={() => togglePlayerStatus(true)}
          onPause={() => togglePlayerStatus(false)}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>

        <Grid
          item
          xs={12}
          container
          spacing={1}
          alignItems={"center"}
          justify={"space-between"}
        >
          <Grid
            item
            xs={1}
            container
            alignItems={"center"}
            justify={"center"}
            spacing={1}
          >
            {isPlayerPlaying ? (
              <PauseTwoToneIcon fontSize={"large"} onClick={pauseAudio} />
            ) : (
              <PlayArrowTwoToneIcon fontSize={"large"} onClick={playAudio} />
            )}
          </Grid>
          <Grid xs={1} item container alignItems={"center"} justify={"center"}>
            <VolumeDown fontSize={"large"} />
          </Grid>
          <Grid
            xs={8}
            item
            container
            justify={"center"}
            alignContent={"center"}
          >
            <Slider
              marks
              min={0}
              max={1}
              step={0.1}
              defaultValue={1}
              onChange={(_, value) => {
                audioElementRef.current.volume = value;
              }}
            />
          </Grid>
          <Grid
            xs={1}
            item
            container
            justify={"center"}
            alignContent={"center"}
          >
            <VolumeUp fontSize={"large"} />
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
    </Grid>
  );
};

export default FipRadio;

const RadioLogo = styled.img`
  width: 25%;
`;
