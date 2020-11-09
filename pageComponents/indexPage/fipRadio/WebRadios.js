import { useMemo, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ChevronLeftSharpIcon from "@material-ui/icons/ChevronLeftSharp";
import ChevronRightSharpIcon from "@material-ui/icons/ChevronRightSharp";

import MetadataContext from "./metadataContext";

const propTypes = {
  onClick: PropTypes.func,
  webRadios: PropTypes.array,
  isPlayerPlaying: PropTypes.bool,
  playingWebRadioId: PropTypes.string,
};

const LEFT = "left";

const WebRadios = ({
  onClick,
  webRadios,
  isPlayerPlaying,
  playingWebRadioId,
}) => {
  const { metadata } = useContext(MetadataContext);
  const [albumCover, updateAlbumCover] = useState(
    metadata?.albumInfo && metadata?.albumInfo?.albumImages[1].url
  );

  useEffect(() => {
    updateAlbumCover(
      metadata?.albumInfo && metadata?.albumInfo?.albumImages[1].url
    );
  }, [metadata]);

  // FIP Metal fails to play
  const filteredWebRadios = useMemo(
    () =>
      webRadios
        .filter((webRadio) => webRadio.id !== "FIP_METAL")
        .concat([
          {
            id: "FIP",
            title: "FIP",
            description: "La radio musicale la plus éclectique.",
            liveStream:
              "https://icecast.radiofrance.fr/fip-midfi.mp3?id=radiofrance",
          },
        ]),
    [webRadios]
  );

  const [currentWebRadioIndex, updateCurrentWebRadioIndex] = useState(() =>
    filteredWebRadios.findIndex((webRadio) => webRadio.id === playingWebRadioId)
  );

  const onArrowClick = (direction) => {
    const webRadiosArrayLength = filteredWebRadios.length;
    const leftIndex =
      currentWebRadioIndex - 1 < 0
        ? filteredWebRadios.length - 1
        : currentWebRadioIndex - 1;
    const rightIndex =
      currentWebRadioIndex + 1 === webRadiosArrayLength
        ? 0
        : currentWebRadioIndex + 1;
    const newWebRadioIndex = direction === LEFT ? leftIndex : rightIndex;

    updateCurrentWebRadioIndex(newWebRadioIndex);
  };

  const currentlySelectedRadioInformation =
    filteredWebRadios[currentWebRadioIndex];

  if (!currentlySelectedRadioInformation) {
    return null;
  }

  const webRadioImageURL =
    playingWebRadioId === currentlySelectedRadioInformation.id && albumCover
      ? albumCover
      : `${currentlySelectedRadioInformation.id}.jpg`;

  const onWebRadioCardClick = () => {
    const isWebRadioAlreadyPlaying =
      isPlayerPlaying &&
      currentlySelectedRadioInformation.id === playingWebRadioId;

    if (isWebRadioAlreadyPlaying) {
      return;
    }
    updateAlbumCover(null);
    onClick(
      currentlySelectedRadioInformation.liveStream,
      currentlySelectedRadioInformation.id
    );
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={1} container justify="center" alignContent="center">
        <ChevronLeftSharpIcon
          style={arrowsStyle}
          onClick={() => onArrowClick(LEFT)}
        />
      </Grid>
      <Grid item xs={10}>
        <StyledCard>
          <WebRadioInformationContainer>
            <WebRadioImage
              src={webRadioImageURL}
              alt={currentlySelectedRadioInformation.title}
              onClick={onWebRadioCardClick}
            />
            <WebRadioTitle id={currentlySelectedRadioInformation.id}>
              {currentlySelectedRadioInformation.title}
            </WebRadioTitle>
          </WebRadioInformationContainer>
        </StyledCard>
      </Grid>
      <Grid item xs={1} container justify="center" alignContent="center">
        <ChevronRightSharpIcon style={arrowsStyle} onClick={onArrowClick} />
      </Grid>
    </Grid>
  );
};

const arrowsStyle = { fontSize: 60 };

const StyledCard = styled(Card)`
  padding: 10px;
  color: ${(props) => props.theme.text} !important;
  background-color: ${(props) => props.theme.body} !important;
`;

const WebRadioInformationContainer = styled.div`
  flex: 0 1 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WebRadioTitle = styled.h2`
  margin: 10px 0;
  cursor: default;
  color: ${(props) => props.theme[props.id]};
`;

const WebRadioImage = styled.img`
  width: 300px;

  &:hover {
    cursor: pointer;
  }
`;

WebRadios.propTypes = propTypes;
export default withTheme(WebRadios);
