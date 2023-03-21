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
import {Navigate, NavLink,} from "react-router-dom";
import {StoreContext} from "../../stores/store.context";
import {useState} from "react";
import {SeverityLevel, SimpleSnackbar} from "../snack-bar/SnackBar";
import {delay} from "lodash";
import {LoadingButton} from "@mui/lab";
import {User} from "../../services/types/user.type";
import {observer} from "mobx-react-lite";

const theme = createTheme();

export const SignUp = observer((): JSX.Element => {
    const {authStore} = React.useContext(StoreContext);
    const authenticated = authStore.isAuthenticated();

    const [busy, setBusy] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarSeverity, setSnackBarSeverity] = useState<SeverityLevel>('info');
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    //todo add validation for email and password

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const partialEntity: Omit<User, "id" | "createdAt" | "updatedAt" | 'uiTheme'> = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
        }

        setBusy(true)
        const {severity, message} = await authStore.signUp(partialEntity);

        setSnackBarSeverity(severity);
        setSnackBarMessage(message);
        setOpenSnackBar(true);
        setBusy(false);

        delay(() => {
            setOpenSnackBar(false);
            if (authenticated)
                setRedirect(true);
        }, 3000)
    };

    return redirect || authenticated
        ? <Navigate to="menu/all"/>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    disabled={busy}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    disabled={busy}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    disabled={busy}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    disabled={busy}
                                />
                            </Grid>
                        </Grid>

                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={busy}
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to='/sign-in'>Already have an account? Sign in</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                    <Copyright sx={{mt: 8, mb: 4}}/>
                </Box>
            </Container>
            <SimpleSnackbar severity={snackBarSeverity} show={openSnackBar} message={snackBarMessage}/>
        </ThemeProvider>
})
