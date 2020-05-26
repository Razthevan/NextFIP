import { useRef, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import usePrevious from "../../hooks/usePrevious";

import WebRadios from "./fipRadio/WebRadios";
import CurrentlyPlaying from "./fipRadio/CurrentlyPlaying";

import FIP_WEB_RADIOS from "./fipRadio/webRadios.query.graphql";

const FipRadio = () => {
  const audioElementRef = useRef(null);
  const [activeWebRadioId, setActiveWebRadioId] = useState(null);
  const previousActiveWebRadioId = usePrevious(activeWebRadioId);
  const [isPlayerPlaying, updateIsPlayerPlaying] = useState(false);
  const [activeWebRadioSource, setActiveWebRadioSource] = useState(null);

  useEffect(() => {
    if (!previousActiveWebRadioId) {
      return;
    }
    if (previousActiveWebRadioId !== activeWebRadioId) {
      audioElementRef.current.play();
    }
  }, [previousActiveWebRadioId, activeWebRadioId]);

  const { loading, error, data } = useQuery(FIP_WEB_RADIOS, {
    onCompleted: (data) => {
      if (error) {
        return;
      }
      updateWebRadioInformation(data.brand.liveStream, data.brand.id);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :(</p>;
  }
  const { title, description, webRadios } = data.brand;

  const updateWebRadioInformation = (activeWebRadioSource, webRadioId) => {
    setActiveWebRadioSource(activeWebRadioSource);
    setActiveWebRadioId(webRadioId);
  };

  const togglePlayerStatus = (status) => updateIsPlayerPlaying(status);

  return (
    <>
      <Container>
        <QuarterOfADiv>
          <RadioLogo
            src="/fip.svg"
            alt={title}
            onClick={() =>
              updateWebRadioInformation(data.brand.liveStream, data.brand.id)
            }
          />
          <p>{description}</p>
        </QuarterOfADiv>
        <QuarterOfADiv>
          <Audio
            controls
            ref={audioElementRef}
            src={activeWebRadioSource}
            onPlay={() => togglePlayerStatus(true)}
            onPause={() => togglePlayerStatus(false)}
          >
            Your browser does not support the
            <code>audio</code> element.
          </Audio>
          <CurrentlyPlaying
            webRadioId={activeWebRadioId}
            isPlayerPlaying={isPlayerPlaying}
          />
        </QuarterOfADiv>
      </Container>

      <WebRadios webRadios={webRadios} onClick={updateWebRadioInformation} />
    </>
  );
};

export default FipRadio;

const RadioLogo = styled.img`
  width: 25%;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (orientation: landscape) {
    width: 100%;
  }
`;

const QuarterOfADiv = styled.div`
  width: 25%;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (orientation: landscape) {
    width: 100%;
  }
`;

const Audio = styled.audio`
  filter: sepia(20%) saturate(70%) grayscale(1) contrast(99%) invert(12%);
  height: 40px;
`;
