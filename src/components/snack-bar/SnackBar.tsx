import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect} from "react";
import {Alert} from "@mui/lab";

export type SeverityLevel = 'error' | 'warning' | 'success' | 'info'

export const SimpleSnackbar = ({
                                   severity = 'info',
                                   show,
                                   message
                               }: { severity: SeverityLevel, show: boolean; message: string }): JSX.Element => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setOpen(show);
    }, [show])

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                autoHideDuration={5000}
                onClose={handleClose}
                action={action}
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </div>
    );
}
