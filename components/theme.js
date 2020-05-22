const fipRock = "FIP_ROCK";
const fipElectro = "FIP_ELECTRO";
const fipGroove = "FIP_GROOVE";
const fipJazz = "FIP_JAZZ";
const fipMetal = "FIP_METAL";
const fipNouveautes = "FIP_NOUVEAUTES";
const fipReggae = "FIP_REGGAE";
const fipWorld = "FIP_WORLD";

const webRadiosColors = {
  [fipRock]: "#f93446",
  [fipElectro]: "#00D3FF",
  [fipGroove]: "#8664EE",
  [fipJazz]: "#13898d",
  [fipMetal]: "#f93446",
  [fipNouveautes]: "#357ded",
  [fipReggae]: "#477442",
  [fipWorld]: "#EFA439",
};

export const lightTheme = {
  body: "#FFF",
  text: "#363537",
  toggleBorder: "#FFF",
  background: "#363537",
  ...webRadiosColors,
};
export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#999",
  ...webRadiosColors,
};
