import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LeftArrow, RightArrow } from "../../../components/Arrows";

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
  const [currentWebRadioIndex, updateCurrentWebRadioIndex] = useState(() => {
    return activeWebRadioId
      ? filteredWebRadios.findIndex(
          (webRadio) => webRadio.id === activeWebRadioId
        )
      : 1;
  });

  useEffect(() => {
    if (activeWebRadioId) {
      updateCurrentWebRadioIndex(
        filteredWebRadios.findIndex(
          (webRadio) => webRadio.id === activeWebRadioId
        )
      );
    }
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
    <Card>
      <ArrowContainer onClick={() => onArrowClick(LEFT)}>
        <LeftArrow />
      </ArrowContainer>
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
      <ArrowContainer onClick={() => onArrowClick()}>
        <RightArrow />
      </ArrowContainer>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  color: inherit;
  cursor: default;
  text-align: left;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WebRadioInformationContainer = styled.div`
  margin: 5px;
  flex: 0 1 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
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
`;

const ArrowContainer = styled.div`
  flex: 0 1 15%;
  &:hover {
    cursor: pointer;
  }
`;

WebRadios.propTypes = propTypes;

export default WebRadios;
