import {createTheme} from "@mui/material/styles";
import {PaletteMode, Theme} from "@mui/material";

const darkTheme: Theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export class ThemeService {

    // TODO https://mui.com/material-ui/customization/dark-mode/

    get theme(): Theme {
        return darkTheme;
    }

    get themeName(): PaletteMode {
        return this.theme.palette.mode;
    }

}

export const THEME_SERVICE = new ThemeService();