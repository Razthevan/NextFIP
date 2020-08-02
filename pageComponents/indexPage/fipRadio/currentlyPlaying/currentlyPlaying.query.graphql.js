import { gql } from "apollo-boost";

export default gql`
  query getCurrentlyPlaying($station: StationsEnum!) {
    live(station: $station) {
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
          performers
          metadata {
            name
            spotifyUrl
            youTubeId
            albumInfo {
              albumName
              albumImages {
                width
                height
                url
              }
              albumReleaseDate
              albumLink
            }
            artistsInfo {
              name
            }
          }
        }
      }
    }
  }
`;
