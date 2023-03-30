//modules
import { useContext, useEffect, useState } from "react";

//components
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { PortfolioDetail } from "./details/PortfolioDetail";
import { EmptyPortfolioList } from "./EmptyPortfolioList";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

//store
import { StoreContext } from "../../../stores/store.context";

//utils
import { findLastIndex, get, isNil } from "lodash";

//types
import { Portfolio } from "../../../stores/types/portfolio.type";

type PortfoliosInfo = {
  firstItem: number;
  lastItem: number;
  currentIndex: number;
  count: number;
};

export const AllPortfolios: React.FC = (props, context): JSX.Element => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfoliosInfo, setPortfoliosInfo] = useState<PortfoliosInfo>({
    firstItem: 0,
    lastItem: 0,
    currentIndex: 0,
    count: 0,
  });
  const [nowFirstItem, setFirstItem] = useState<boolean>(true);
  const [nowLastItem, setLastItem] = useState<boolean>(false);

  const { portfolioService } = useContext(StoreContext);

  const next = () => {
    if (nowLastItem) return;

    const nextIndex = portfoliosInfo.currentIndex + 1;

    const nextItem = portfolios[nextIndex];

    if (!isNil(nextItem)) {
      setFirstItem(false);
      setLastItem(portfoliosInfo.lastItem === nextIndex);
      setPortfoliosInfo(({ currentIndex, ...rest }) => ({
        currentIndex: nextIndex,
        ...rest,
      }));
    }
  };
  const previous = () => {
    if (nowFirstItem) return;

    const previousIndex = portfoliosInfo.currentIndex - 1;

    const previousItem = portfolios[previousIndex];

    if (!isNil(previousItem)) {
      setFirstItem(portfoliosInfo.firstItem === previousIndex);
      setLastItem(false);
      setPortfoliosInfo(({ currentIndex, ...rest }) => ({
        currentIndex: previousIndex,
        ...rest,
      }));
    }
  };

  const getAllPortfolios = async () => {
    const response = await portfolioService.findAll();

    setPortfolios(response);
    setPortfoliosInfo({
      firstItem: 0,
      lastItem: findLastIndex(response),
      currentIndex: 0,
      count: response.length,
    });
  };

  useEffect(() => {
    //todo reimplement this
    getAllPortfolios();
  }, []);

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
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
            {portfolios[portfoliosInfo.currentIndex]?.name}
          </Typography>
          <Stack
            sx={{ pt: 1 }}
            direction="row"
            spacing={5}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              startIcon={<KeyboardArrowLeft />}
              disabled={portfoliosInfo.count <= 1 || nowFirstItem}
              onClick={previous}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowRight />}
              disabled={portfoliosInfo.count <= 1 || nowLastItem}
              onClick={next}
            >
              Next
            </Button>
          </Stack>
        </Container>
      </Box>

      {portfolios?.length > 0 ? (
        <PortfolioDetail
          portfolio={
            get(portfolios, [portfoliosInfo.currentIndex]) as Portfolio
          }
        />
      ) : (
        <EmptyPortfolioList />
      )}
    </main>
  );
};
