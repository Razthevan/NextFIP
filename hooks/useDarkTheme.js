import { useState } from "react";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

const useDarkTheme = () => {
  const [themeMode, setThemeMode] = useState(DARK_THEME);

  const toggleThemeMode = () => {
    themeMode === LIGHT_THEME
      ? setThemeMode(DARK_THEME)
      : setThemeMode(LIGHT_THEME);
  };

  return [themeMode, toggleThemeMode];
};

export default useDarkTheme;
