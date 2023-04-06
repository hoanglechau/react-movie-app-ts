import CssBaseline from "@mui/material/CssBaseline";
import darkScrollbar from "@mui/material/darkScrollbar";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider
} from "@mui/material/styles";

// Create a theme instance
function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000"
      }
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "'Noto Sans', sans-serif",
      h5: {
        fontWeight: 800,
        letterSpacing: 3
      },
      h6: {
        fontSize: "28px",
        fontWeight: 600
      },
      body: {
        fontSize: "18px",
        fontWeight: 300
      },
      body1: {
        fontWeight: 600
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => ({
          body: darkScrollbar()
        })
      }
    }
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
