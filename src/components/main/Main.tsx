import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "../../common/components/copyright";
import CustomizedMenus from "../toolbar/CostomizedMenu";
import {PaletteMode} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {StoreContext} from "../../stores/store.context";
import {User} from "../../services/types/user.type";
import {Outlet} from "react-router-dom";
import {UserService} from "../../services/user.service";
import {observer} from "mobx-react-lite";

export const Main = observer((): JSX.Element => {
    const [mode, setMode] = React.useState<PaletteMode>('light');

    const {authStore} = React.useContext(StoreContext);
    const userService = new UserService(authStore);

    const setTheme = (theme: Pick<User, 'uiTheme'>) => {
        userService.updateTheme(theme);
    }

    const changeMode = () => setMode((prevMode) => {
        const newTheme = prevMode === 'light' ? 'dark' : 'light';

        if (prevMode !== newTheme)
            setTheme(newTheme as unknown as Pick<User, 'uiTheme'>);

        return newTheme;
    });

    const getThemeModeFromBe = async () => {
        const user = (await userService.getUser()).data;

        setMode(user.uiTheme);
    }


    React.useEffect(() => {
        getThemeModeFromBe();
    }, [])

    const theme = React.useMemo(() => createTheme({palette: {mode}}), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    {/*dropdown menu*/}
                    <CustomizedMenus/>
                    <IconButton sx={{ml: 1}} onClick={changeMode} color="inherit">
                        {mode === 'light' ? <DarkMode/> : <LightMode/>}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/*body*/}
            <Outlet/>

            {/*footer*/}
            <Copyright sx={{mt: 8, mb: 4}}/>
        </ThemeProvider>
    );
});
