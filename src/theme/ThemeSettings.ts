import { PaletteMode } from "@mui/material";
import { blue, deepOrange, grey } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: blue,
          divider: blue[200],
          background: {
            default: grey[50],
            paper: grey[100],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: grey[800],
            paper: grey[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
export default getDesignTokens;
