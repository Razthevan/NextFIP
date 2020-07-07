import styled from "styled-components";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import PauseTwoToneIcon from "@material-ui/icons/PauseTwoTone";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";

const propTypes = {
  playAudio: PropTypes.func.isRequired,
  pauseAudio: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  isPlayerPlaying: PropTypes.bool.isRequired,
  activeWebRadioId: PropTypes.string.isRequired,
};

const PlayerControls = ({
  playAudio,
  pauseAudio,
  onVolumeChange,
  isPlayerPlaying,
  activeWebRadioId,
}) => (
  <>
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
        onChange={onVolumeChange}
        activewebradioid={activeWebRadioId}
      />
    </Grid>
    <Grid xs={1} item container justify="center" alignContent="center">
      <VolumeUp />
    </Grid>
  </>
);

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

PlayerControls.propTypes = propTypes;

export default PlayerControls;
