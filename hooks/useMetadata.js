import { useState, useCallback } from "react";

const useMetadata = () => {
  const [metadata, setMetadata] = useState(null);

  const setCurrentTrackMetadata = useCallback((metadata) => {
    setMetadata(metadata);
  }, []);

  return {
    metadata,
    setCurrentTrackMetadata,
  };
};

export default useMetadata;
