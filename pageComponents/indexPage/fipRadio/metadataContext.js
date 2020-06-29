import { createContext } from "react";

const defaultMetadataContext = {
  metadata: null,
  setCurrentTrackMetadata: () => {},
};

const MetadataContext = createContext(defaultMetadataContext);

export default MetadataContext;
