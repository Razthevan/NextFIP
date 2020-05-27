const fip = "FIP";
const fipRock = "FIP_ROCK";
const fipJazz = "FIP_JAZZ";
const fipWorld = "FIP_WORLD";
const fipReggae = "FIP_REGGAE";
const fipGroove = "FIP_GROOVE";
const fipElectro = "FIP_ELECTRO";
const fipNouveautes = "FIP_NOUVEAUTES";

const webRadiosColors = {
  [fip]: "#E2007A",
  [fipRock]: "#f93446",
  [fipJazz]: "#13898d",
  [fipWorld]: "#EFA439",
  [fipReggae]: "#477442",
  [fipGroove]: "#8664EE",
  [fipElectro]: "#00D3FF",
  [fipNouveautes]: "#357ded",
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
  background: "#999",
  toggleBorder: "#6B8096",
  ...webRadiosColors,
};
