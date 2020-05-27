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
  const [isPlayerPlaying, updateIsPlayerPlaying] = useState(false);
  const [activeWebRadioSource, setActiveWebRadioSource] = useState(null);

  useEffect(() => {
    if (activeWebRadioId) {
      audioElementRef.current.play();
    }
  }, [activeWebRadioId]);

  const { loading, error, data } = useQuery(FIP_WEB_RADIOS);

  if (loading)
    return (
      <Row>
        <Column>
          <p>Loading...</p>
        </Column>
      </Row>
    );
  if (error) {
    return (
      <Row>
        <Column>
          <p>Error :(</p>
        </Column>
      </Row>
    );
  }
  const { title, description, webRadios } = data.brand;

  const updateWebRadioInformation = (activeWebRadioSource, webRadioId) => {
    setActiveWebRadioSource(activeWebRadioSource);
    setActiveWebRadioId(webRadioId);
  };

  const togglePlayerStatus = (status) => updateIsPlayerPlaying(status);

  return (
    <Row activeWebRadioId={activeWebRadioId}>
      <Column>
        <div>
          <a
            target="_blank"
            href="https://www.fip.fr/"
            title="You should definitely give FIP a try"
          >
            <RadioLogo src="/fip.svg" alt={title} />
          </a>
          <p>{description}</p>
        </div>
        <div>
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
        </div>
      </Column>
      <Column>
        <WebRadios
          webRadios={webRadios}
          activeWebRadioId={activeWebRadioId}
          onClick={updateWebRadioInformation}
        />
      </Column>
    </Row>
  );
};

export default FipRadio;

const RadioLogo = styled.img`
  width: 25%;
`;

const Row = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  flex: 1 1 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Audio = styled.audio`
  height: 40px;
  margin: 10px 0;
  filter: sepia(20%) saturate(70%) grayscale(1) contrast(99%) invert(12%);
`;
