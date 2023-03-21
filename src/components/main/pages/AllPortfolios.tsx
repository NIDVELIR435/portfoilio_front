import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../../stores/store.context";
import {PortfolioService} from "../../../services/portfolio.service";
import {Portfolio} from "../../../services/types/portfolio.type";
import {useNavigate} from "react-router-dom";

export default function AllPortfolios(): JSX.Element {
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState<Portfolio[]>([])

    const {authStore} = useContext(StoreContext);
    const portfolioService = new PortfolioService(authStore);
    const getAllPortfolios = async () => {
        const response = await portfolioService.findAll();
        console.log(response)
        setPortfolios([]);
    }

    useEffect(() => {
        getAllPortfolios()
    }, [])

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Your Portfolios
                    </Typography>
                    <Stack
                        sx={{pt: 1}}
                        direction="row"
                        spacing={5}
                        justifyContent="center"
                    >
                        <Button variant="outlined" startIcon={<KeyboardArrowLeft/>}>Previous</Button>
                        <Button variant="outlined" endIcon={<KeyboardArrowRight/>}>Next</Button>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{py: 1}} maxWidth="md">
                {portfolios?.length === 0 && <Box
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
                        <Button variant="outlined" onClick={()=> navigate('new')}>Create new</Button>
                    </Stack>
                </Box>}
                {portfolios?.length > 0 && <Grid container spacing={4}>
                    {portfolios.map(({id, description, name}) => (
                        <Grid item key={id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image="https://source.unsplash.com/random"
                                    alt="random"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {name}
                                    </Typography>
                                    <Typography>
                                        {description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" hidden={true}>Details</Button>
                                    <Button size="small" hidden={true}>Edit</Button>
                                    <Button size="small" hidden={true}>Remove</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>}
            </Container>
        </main>
    );
}
