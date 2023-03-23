import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

export const EmptyPortfolioList: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Looks like you do not have an portfolio
            </Typography>
            <Stack
                sx={{pt: 2, mt: 2}}
                direction="row"
                spacing={5}
                justifyContent="center"
            >
                <Button variant="outlined" onClick={() => navigate('new')}>Create new</Button>
            </Stack>
        </Box>
    );
}
