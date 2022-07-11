import {createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";



declare module '@mui/material/styles/createPalette' {
  interface Palette {
    actionbutton: Palette['primary'];
    actionbutton2: Palette['primary'];
  }

  interface PaletteOptions {
    actionbutton?: PaletteOptions['primary'];
    actionbutton2?: PaletteOptions['primary'];
    actionbuttonblue?: PaletteOptions['primary'];
    actionbuttonLightBlue?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    actionbutton: true;
    actionbutton2: true;
    actionbuttonblue: true;
    actionbuttonLightBlue: true,
  }
  interface ButtonPropsVariantOverrides {
    large: true;
  }
}
const defTheme = createTheme();

export const theme = createTheme({
  palette: {
    mode: 'light',
    actionbutton: {
      main: "#ffa600",
      contrastText: '#fff',
    },
    actionbutton2: {
      main: "#aaa",
      contrastText: '#fff',
    },
    actionbuttonblue: {
      main: defTheme.palette.primary.main,
      contrastText: '#fff',
    },
    actionbuttonLightBlue: {
      main: "#2279ec5E",
      contrastText: "#fff",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          if (ownerState.color !== undefined) {
            if (ownerState.color.startsWith("actionbutton")) {
              return {
                padding: "15px",
                fontSize: "1.5rem",
                margin: "10px",
              };
            }
          } 
          return {}; // don't apply custom styling
        }
      },
      variants: [
        {
          props: { variant: 'large', },
          style: {
            margin: "10px",
            fontSize: "1.5rem",
            padding: "15px",
            backgroundColor: "#ffa500",
            color: "#fff",
            boxShadow: shadows[4],
            '&:hover': {
              backgroundColor: "#ffa500",
              color: "#fff",
              boxShadow: shadows[6],
            },
          },
        },
      ],
    },
  },
  
});