import { useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";

import MetadataContext from "./metadataContext";
import SpotifyLink from "./currentlyPlaying/SpotifyLink";

import CURRENTLY_PLAYING_QUERY from "./currentlyPlaying/currentlyPlaying.query.graphql";
import CurrentlyPlayingInformation from "./currentlyPlaying/CurrentlyPlayingInformation";

const propTypes = {
  webRadioId: PropTypes.string,
};

const CurrentlyPlaying = ({ webRadioId }) => {
  const { loading, error, data, refetch } = useQuery(CURRENTLY_PLAYING_QUERY, {
    variables: { station: webRadioId },
  });

  const { setCurrentTrackMetadata } = useContext(MetadataContext);

  useEffect(() => {
    const now = moment();
    // Adding 5 seconds because the song's ending time is not very accurate
    const songEnd = moment.unix(data?.live?.song?.end).add(10, "seconds");
    const pollingInterval = songEnd.diff(now, "milliseconds");
    const fetchDataTimeout = setTimeout(() => {
      refetch();
    }, pollingInterval);
    return () => clearTimeout(fetchDataTimeout);
  }, [data, refetch]);

  useEffect(() => {
    setCurrentTrackMetadata(data?.live?.song?.track?.metadata);
  }, [data]);

  if (error || loading) {
    return <CurrentlyPlayingContainer />;
  }
  const { song } = data.live;

  if (!song) {
    return (
      <CurrentlyPlayingContainer>
        Could not identify song
      </CurrentlyPlayingContainer>
    );
  }

  return (
    <CurrentlyPlayingContainer>
      <CurrentlyPlayingInformation song={song} webRadioId={webRadioId} />
      <SpotifyLink spotifyLink={song.track?.metadata?.spotifyUrl} />
    </CurrentlyPlayingContainer>
  );
};

const CurrentlyPlayingContainer = styled.div`
  margin: 10px 0;
  cursor: default;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

CurrentlyPlaying.propTypes = propTypes;

export default CurrentlyPlaying;
