import {useContext, useEffect, useState} from "react";
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
import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";


export const Main = observer((): JSX.Element => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const {userService} = useContext(StoreContext);

    const changeMode = async (uiTheme: 'light' | 'dark') => {
        await userService.updateTheme(uiTheme);
    }

    useEffect(()=> {
        setMode(userService.userTheme);
    },[userService.userTheme])

    return (
        <ThemeProvider theme={createTheme({palette: {mode}})}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    {/*dropdown menu*/}
                    <CustomizedMenus/>
                    <IconButton sx={{ml: 1}} onClick={() => changeMode(mode === 'light' ? 'dark' : 'light')}
                                color="inherit">
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
