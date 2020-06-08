import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ChevronLeftSharpIcon from "@material-ui/icons/ChevronLeftSharp";
import ChevronRightSharpIcon from "@material-ui/icons/ChevronRightSharp";

const propTypes = {
  onClick: PropTypes.func,
  webRadios: PropTypes.array,
  activeWebRadioId: PropTypes.string,
};

const LEFT = "left";

const WebRadios = ({ onClick, webRadios, activeWebRadioId }) => {
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
    console.log("activeWebRadioId: ", activeWebRadioId);
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
            <div>
              <WebRadioTitle id={activeWebRadioInformation.id}>
                {activeWebRadioInformation.title}
              </WebRadioTitle>
              <WebRadioDescription>
                {activeWebRadioInformation.description}
              </WebRadioDescription>
            </div>
            <WebRadioLogo
              src={`${activeWebRadioInformation.id}.jpg`}
              alt={activeWebRadioInformation.title}
              onClick={() => {
                onClick(
                  activeWebRadioInformation.liveStream,
                  activeWebRadioInformation.id
                );
              }}
            />
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
  margin: 5px;
  flex: 0 1 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WebRadioTitle = styled.h2`
  color: ${(props) => props.theme[props.id]};
  margin-bottom: 10px;
`;

const WebRadioDescription = styled.p`
  margin-bottom: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const WebRadioLogo = styled.img`
  max-width: 200px;

  &:hover {
    cursor: pointer;
  }
`;

WebRadios.propTypes = propTypes;

export default withTheme(WebRadios);
