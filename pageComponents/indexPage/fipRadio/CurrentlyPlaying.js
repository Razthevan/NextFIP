import { useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";

import MetadataContext from "./metadataContext";
import SpotifyLink from "./currentlyPlaying/SpotifyLink";

import CURRENTLY_PLAYING_QUERY from "./currentlyPlaying/currentlyPlaying.query.graphql";

const propTypes = {
  webRadioId: PropTypes.string,
  isPlayerPlaying: PropTypes.bool.isRequired,
};

const CurrentlyPlaying = ({ webRadioId, isPlayerPlaying }) => {
  const { setCurrentTrackMetadata } = useContext(MetadataContext);

  const { loading, error, data, refetch } = useQuery(CURRENTLY_PLAYING_QUERY, {
    variables: { station: webRadioId ? webRadioId : "FIP" },
    skip: !isPlayerPlaying || !webRadioId,
    onCompleted: (data) => {
      setCurrentTrackMetadata(data?.live?.song?.track?.metadata);
    },
  });

  useEffect(() => {
    if (!isPlayerPlaying) {
      return;
    }
    const now = moment();
    // Adding 5 seconds because the song's ending time is not very accurate
    const songEnd = moment.unix(data?.live?.song?.end).add(5, "seconds");
    const pollingInterval = songEnd.diff(now, "milliseconds");
    const fetchDataTimeout = setTimeout(() => {
      refetch();
    }, pollingInterval);
    return () => clearTimeout(fetchDataTimeout);
  }, [data, isPlayerPlaying, refetch]);

  if (error || loading || !isPlayerPlaying || !webRadioId) {
    return <CurrentlyPlayingContainer />;
  }
  const { song } = data.live;

  if (!song) {
    return <CurrentlyPlayingContainer />;
  }

  return (
    <CurrentlyPlayingContainer>
      <p>
        Currently playing{" "}
        <TrackTitle id={webRadioId}>{song.track.title}</TrackTitle> by
        {song.track.mainArtists.map((artist) => (
          <span key={artist}> {artist}</span>
        ))}{" "}
        on{" "}
        <WebRadioName id={webRadioId}>
          {convertWebRadioIdToName(webRadioId)}
        </WebRadioName>
      </p>
      <SpotifyLink spotifyLink={song.track?.metadata?.spotifyUrl} />
    </CurrentlyPlayingContainer>
  );
};

const convertWebRadioIdToName = (webRadioId) =>
  webRadioId.toLowerCase().split("_").join(" ");

const WebRadioName = styled.span`
  color: ${(props) => props.theme[props.id]};
  text-transform: capitalize;
`;

const TrackTitle = styled.span`
  color: ${(props) => props.theme[props.id]};
`;

const CurrentlyPlayingContainer = styled.div`
  margin: 10px 0;
  min-height: 36px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

CurrentlyPlaying.propTypes = propTypes;

export default CurrentlyPlaying;
