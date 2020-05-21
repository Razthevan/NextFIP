import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import WebRadios from "./fipRadio/WebRadios";
import styled from "styled-components";

const FIP_WEB_RADIOS = gql`
  {
    brand(id: FIP) {
      id
      title
      baseline
      description
      websiteUrl
      liveStream

      webRadios {
        id
        title
        description
        liveStream
      }
    }
    live(station: FIP) {
      show {
        start
        end
      }
      program {
        start
        end
      }
      song {
        start
        end
        track {
          title
          mainArtists
          albumTitle
          productionDate
        }
      }
    }
  }
`;

const FipRadio = () => {
  const { loading, error, data } = useQuery(FIP_WEB_RADIOS);
  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :(</p>;
  }
  const { title, description, webRadios, liveStream } = data.brand;

  const { track } = data.live?.song;

  return (
    <>
      <CurrentlyPlaying>
        <div>
          <RadioLogo src="/fip.svg" alt={title} />
          <p>{description}</p>
        </div>
        <div>
          <figure>
            <figcaption>
              Currently playing {track.title} by
              {track.mainArtists.map((artist) => (
                <p key={artist}>{artist}</p>
              ))}
            </figcaption>
            <audio controls src={liveStream}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
        </div>
      </CurrentlyPlaying>

      <WebRadios webRadios={webRadios} />
    </>
  );
};

export default FipRadio;

const RadioLogo = styled.img`
  width: 25%;
`;

const CurrentlyPlaying = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
