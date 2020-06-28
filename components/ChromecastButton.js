import { useEffect, useCallback } from "react";

const ChromecastButton = () => {
  const initChromecastAPI = useCallback(() => {
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    });
  }, []);
  useEffect(() => {
    window[`__onGCastApiAvailable`] = (isAvailable) => {
      if (isAvailable) {
        console.log("isAvailable: ", isAvailable);
        initChromecastAPI();
      }
    };
  }, []);
  return (
    <google-cast-launcher
      style={{ width: "24px", height: "auto", display: "flex" }}
    />
  );
};

export default ChromecastButton;
