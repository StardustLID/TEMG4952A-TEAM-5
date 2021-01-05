import { createMuiTheme } from "@material-ui/core/styles";

// Customize the default Material UI theme
// Documentation: https://material-ui.com/customization/theming/
// Default theme: https://material-ui.com/customization/default-theme/

const muiTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#e60100",
      main: "#941a1a",
    },
    action: {
      hover: "rgba(255, 255, 255, 0.08)",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
  },
});

export default muiTheme;
