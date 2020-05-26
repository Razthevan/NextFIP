import { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import CURRENTLY_PLAYING_QUERY from "./currentlyPlaying/currentlyPlaying.query.graphql";

const propTypes = {
  webRadioId: PropTypes.string,
  isPlayerPlaying: PropTypes.bool.isRequired,
};

const CurrentlyPlaying = ({ webRadioId, isPlayerPlaying }) => {
  const { loading, error, data, refetch } = useQuery(CURRENTLY_PLAYING_QUERY, {
    variables: { station: webRadioId ? webRadioId : "FIP" },
    skip: !isPlayerPlaying,
    fetchPolicy: "no-cache",
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
    return null;
  }
  const { song } = data.live;
  if (!song) {
    return null;
  }

  return (
    <div>
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
    </div>
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

CurrentlyPlaying.propTypes = propTypes;

export default CurrentlyPlaying;
