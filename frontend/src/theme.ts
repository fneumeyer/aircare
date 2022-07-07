import { Style } from "@mui/icons-material";
import { Color, createTheme } from "@mui/material";
import { blue, lime, red } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";
import { hover } from "@testing-library/user-event/dist/hover";
import { inherits } from "util";

/*
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
  }
  interface SimplePaletteColorOptions {
    tertiary?: string;
  }
}*/
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    actionbutton: Palette['primary'];
  }

  interface PaletteOptions {
    actionbutton?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    actionbutton: true;
  }
  interface ButtonPropsVariantOverrides {
    large: true;
  }
}
const defaultTheme = createTheme();
export const theme = createTheme({
  palette: {
    mode: 'light',
    actionbutton: {
      main: "#ffa600",
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'large', },
          style: {
            margin: "10px",
            fontSize: "1.5rem",
            padding: "15px",
            /*color: defaultTheme.palette.primary.contrastText,
            backgroundColor: defaultTheme.palette.primary.main,*/
            backgroundColor: "#ffa500",
            color: "#fff",
            boxShadow: shadows[4],
            '&:hover': {
              /*color: "inherit",//defaultTheme.palette.primary.contrastText,
              backgroundColor: defaultTheme.palette.primary.main,*/
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