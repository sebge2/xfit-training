import {useRef} from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import {ThemeProvider} from '@mui/material/styles';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Toolbar, Typography} from "@mui/material";
import {UserAvatarMenu} from "./UserAvatarMenu.tsx";
import {THEME_SERVICE} from "../../../services/theme-service.ts";
import {usePageName} from "../../../hooks/use-page-name.tsx";

export default function Menu({children}: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const pageNames = usePageName();

    /*
    TODO create an object with menu
     */

    const getActiveRoute = () => {
        if (location.pathname.startsWith('/exercises')) {
            return 0;
        } else if (location.pathname.startsWith('/wods')) {
            return 1;
        } else if (location.pathname.startsWith('/settings')) {
            return 2;
        } else {
            return 0;
        }
    };

    return (
        <ThemeProvider theme={THEME_SERVICE.theme}>
            <Box sx={{pb: 7}} ref={ref}>
                <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography variant="h6" component="div">
                                {pageNames.join(" > ")}
                            </Typography>

                            <Box sx={{ml: "auto"}}>
                                <UserAvatarMenu/>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box component="main" sx={{
                        flexGrow: 1,
                        pt: 8
                    }}>
                        <CssBaseline/>

                        {children}
                    </Box>
                </Box>


                <Paper
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                    elevation={10}>
                    <BottomNavigation
                        showLabels
                        value={getActiveRoute()}>
                        <BottomNavigationAction
                            label="Exercices"
                            icon={<EmojiEventsIcon/>}
                            component={Link}
                            to="/exercises"
                        />
                        <BottomNavigationAction
                            label="Wods"
                            icon={<GroupIcon/>}
                            component={Link}
                            to="/wods"
                        />
                        <BottomNavigationAction
                            label="Settings"
                            icon={<SettingsIcon/>}
                            component={Link}
                            to="/settings"
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}