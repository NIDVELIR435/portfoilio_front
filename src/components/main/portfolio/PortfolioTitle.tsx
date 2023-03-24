import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Portfolio } from "../../../stores/types/portfolio.type";
import { useNavigate } from "react-router-dom";

type Props = {
  portfolio: Portfolio;
};

export const PortfolioTitle: React.FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio>(props.portfolio);

  useEffect(() => {
    setPortfolio(props.portfolio);
  }, [props.portfolio]);

  return (
    <Grid item key={portfolio.id} xs={4} sm={4} md={2}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardActions>
          <Button
            size="small"
            disabled={false}
            onClick={() =>
              navigate(`../list/${props?.portfolio?.id}`, { replace: true })
            }
          >
            Edit
          </Button>
          <Button size="small" disabled={true}>
            Remove
          </Button>
        </CardActions>
        <CardMedia
          component="img"
          sx={{
            pt: "2%",
          }}
          image="https://source.unsplash.com/random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {portfolio.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
