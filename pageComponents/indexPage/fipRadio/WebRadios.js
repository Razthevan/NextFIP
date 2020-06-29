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
  activeWebRadioId: PropTypes.string,
};

const LEFT = "left";

const WebRadios = ({ onClick, webRadios, activeWebRadioId }) => {
  const { metadata, setCurrentTrackMetadata } = useContext(MetadataContext);

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
    filteredWebRadios.findIndex((webRadio) => webRadio.id === activeWebRadioId)
  );

  useEffect(() => {
    if (!activeWebRadioId) {
      return;
    }

    updateCurrentWebRadioIndex(
      filteredWebRadios.findIndex(
        (webRadio) => webRadio.id === activeWebRadioId
      )
    );
  }, [activeWebRadioId]);

  const onArrowClick = (direction) => {
    const webRadiosArrayLength = filteredWebRadios.length;
    let newWebRadioIndex;
    if (direction === LEFT) {
      newWebRadioIndex =
        currentWebRadioIndex - 1 < 0
          ? filteredWebRadios.length - 1
          : currentWebRadioIndex - 1;
      updateCurrentWebRadioIndex(newWebRadioIndex);
    } else {
      newWebRadioIndex =
        currentWebRadioIndex + 1 === webRadiosArrayLength
          ? 0
          : currentWebRadioIndex + 1;
      updateCurrentWebRadioIndex(newWebRadioIndex);
    }
  };

  const activeWebRadioInformation = filteredWebRadios[currentWebRadioIndex];

  if (!activeWebRadioInformation) {
    return null;
  }

  const webRadioImageURL =
    activeWebRadioId === activeWebRadioInformation.id && metadata
      ? metadata?.albumInfo?.albumImages[1].url
      : `${activeWebRadioInformation.id}.jpg`;

  return (
    <Grid container direction={"row"} alignItems={"center"}>
      <Grid item xs={1} container justify={"center"} alignContent={"center"}>
        <ChevronLeftSharpIcon
          style={{ fontSize: 60 }}
          onClick={() => onArrowClick(LEFT)}
        />
      </Grid>
      <Grid item xs={10}>
        <StyledCard raised>
          <WebRadioInformationContainer>
            <WebRadioImage
              src={webRadioImageURL}
              alt={activeWebRadioInformation.title}
              onClick={() => {
                setCurrentTrackMetadata(null);
                onClick(
                  activeWebRadioInformation.liveStream,
                  activeWebRadioInformation.id
                );
              }}
            />
            <WebRadioTitle id={activeWebRadioInformation.id}>
              {activeWebRadioInformation.title}
            </WebRadioTitle>
          </WebRadioInformationContainer>
        </StyledCard>
      </Grid>
      <Grid item xs={1} container justify={"center"} alignContent={"center"}>
        <ChevronRightSharpIcon
          style={{ fontSize: 60 }}
          onClick={() => onArrowClick()}
        />
      </Grid>
    </Grid>
  );
};

const StyledCard = styled(Card)`
  color: ${(props) => props.theme.text} !important;
  padding: 10px;
  background-color: ${(props) => props.theme.body} !important;
`;

const WebRadioInformationContainer = styled.div`
  flex: 0 1 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WebRadioTitle = styled.h2`
  color: ${(props) => props.theme[props.id]};
  margin: 10px 0;
`;

const WebRadioImage = styled.img`
  width: 300px;

  &:hover {
    cursor: pointer;
  }
`;

WebRadios.propTypes = propTypes;

export default withTheme(WebRadios);
