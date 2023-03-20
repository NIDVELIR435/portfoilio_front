import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "../../common/components/copyright";
import {Navigate, NavLink, redirect} from "react-router-dom";
import {StoreContext} from "../../stores/store.context";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";

const theme = createTheme();

export const SignIn = (): JSX.Element => {
    const {authStore} = React.useContext(StoreContext);
    const authenticated = authStore.isAuthenticated();

    const [busy, setBusy] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        setBusy(true);
        await authStore.signIn({email, password});

        redirect('main');
        setBusy(false);
    };

    return authenticated
        ? <Navigate to="/main"/>
        : <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        disabled={busy}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        disabled={busy}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={busy}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <NavLink to='/sign-up'>Don't have an account? Sign Up</NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Box>
        </Container>
    </ThemeProvider>
}
