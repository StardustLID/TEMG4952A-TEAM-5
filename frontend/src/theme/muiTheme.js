import { createMuiTheme } from "@material-ui/core/styles";

// Customize the default Material UI theme
// Documentation: https://material-ui.com/customization/theming/
// Default theme: https://material-ui.com/customization/default-theme/

const muiTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#e60100",
      main: "#a71111",
    },
    action: {
      hover: "rgba(255, 255, 255, 0.08)",
    },
  },
  // Used by <Typography />
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 700,
    },
  },
});

export default muiTheme;
