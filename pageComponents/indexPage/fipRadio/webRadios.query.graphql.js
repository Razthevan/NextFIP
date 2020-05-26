import { gql } from "apollo-boost";

export default gql`
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
  }
`;
