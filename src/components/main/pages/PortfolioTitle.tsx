import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {Portfolio} from "../../../stores/types/portfolio.type";

type Props = {
    portfolio: Portfolio
}

export const PortfolioTitle: React.FC<Props> = (props): JSX.Element => {
    const [portfolio, setPortfolio] = useState<Portfolio>(props.portfolio);

    useEffect(() => {
        setPortfolio(props.portfolio)
    }, [props.portfolio])

    return (
        <Grid item key={portfolio.id} xs={4} sm={4} md={2}>
            <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <CardMedia
                    component="img"
                    sx={{
                        pt: '2%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {portfolio.name}
                    </Typography>
                    <Typography>
                        {portfolio.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" hidden={true}>Details</Button>
                    <Button size="small" hidden={true}>Edit</Button>
                    <Button size="small" hidden={true}>Remove</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
