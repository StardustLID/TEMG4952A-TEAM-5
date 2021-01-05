import { createMuiTheme } from "@material-ui/core/styles";

// Customize the default Material UI theme
// Documentation: https://material-ui.com/customization/theming/
// Default theme: https://material-ui.com/customization/default-theme/

const muiTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#E60100",
      main: "#941a1a",
    },
  },
  typography: {
    h1: {
      fontSize: "2.125rem",
      fontWeight: 700,
    },
  },
});

export default muiTheme;
