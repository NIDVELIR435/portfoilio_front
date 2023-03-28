import { useEffect, FC, useContext, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { StoreContext } from "../../../../stores/store.context";
import { Image } from "../../../../stores/types/image.type";
import { Portfolio } from "../../../../stores/types/portfolio.type";
import * as React from "react";
import { ImageList, ImageListItem, Tooltip } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Backdrop } from "../../../../common/components/Backdrop";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import { isEmpty, isNil } from "lodash";
import { DateTime } from "luxon";
import { NewImage } from "./NewImage";
import { iconColor } from "../../../../common/constants/icon-color.constant";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";

export const PortfolioDetail: FC<{ portfolio: Portfolio }> = observer(
  ({ portfolio }): JSX.Element => {
    const [images, setImages] = useState<Image[]>([]);
    const [busy, setBusy] = useState<boolean>(false);

    const [headerHeight, setHeaderHeight] = useState(0);
    const [screenHeight] = useState(window.screen.height);

    const { imageService } = useContext(StoreContext);

    const getAll = async (): Promise<void> => {
      setBusy(true);
      const id = Number(portfolio.id);

      const images = await imageService.findAllPortfolioId(id);

      if (!isNil(images) && Array.isArray(images)) {
        setImages(images);
      }
      setBusy(false);
    };

    const deleteItem = async (idToDelete: number): Promise<void> => {
      setBusy(true);
      await imageService.removeById(idToDelete).then(() => {
        setImages(images.filter(({ id }) => id !== idToDelete));
      });
      setBusy(false);
    };

    const assembleDate = (date: Date | undefined): string =>
      !isNil(date)
        ? DateTime.fromJSDate(new Date(date)).toLocaleString(
            DateTime.DATETIME_SHORT
          )
        : "Not assigned yet";

    const div = useCallback((node: Element) => {
      if (node !== null) {
        const height =
          node?.parentElement?.parentElement
            ?.getElementsByTagName("header")
            ?.item(0)
            ?.getBoundingClientRect()?.height ?? 0;

        setHeaderHeight(height);
      }
    }, []);

    useEffect(() => {
      getAll();
    }, [portfolio]);

    return (
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
          ref={div}
        >
          <Container>
            <Grid
              container
              sx={{
                boxShadow: 3,
                p: 2,
                height: screenHeight - headerHeight - 400,
              }}
            >
              <Grid item xs={6}>
                <ImageList
                  sx={{
                    width: 500,
                    maxHeight: screenHeight - headerHeight - 500,
                  }}
                  cols={1}
                  rowHeight={500}
                >
                  {/*todo add default image*/}
                  {isEmpty(images) ? (
                    <></>
                  ) : (
                    images.map(({ id, url, description }) => (
                      <ImageListItem key={id}>
                        <img
                          src={`${url}`}
                          srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt="none"
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={description}
                          actionIcon={
                            <span>
                              <Tooltip title="Delete">
                                <IconButton
                                  sx={{ color: iconColor }}
                                  onClick={() => deleteItem(id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="info">
                                <IconButton sx={{ color: iconColor }}>
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                            </span>
                          }
                        />
                      </ImageListItem>
                    ))
                  )}
                </ImageList>
              </Grid>
              <Grid item xs={6}>
                <Box component="form" onSubmit={() => {}} sx={{ mt: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Details
                  </Typography>
                  <TextField
                    margin="dense"
                    fullWidth
                    id="description"
                    multiline={true}
                    type="text"
                    name="description"
                    label="Description"
                    value={portfolio?.description + " " + headerHeight ?? ""}
                  />
                  <TextField
                    margin="dense"
                    fullWidth
                    id="createdAt"
                    type="text"
                    name="createdAt"
                    label="Created At"
                    value={assembleDate(portfolio?.createdAt)}
                  />
                  <TextField
                    margin="dense"
                    fullWidth
                    id="updatedAt"
                    type="text"
                    name="updatedAt"
                    label="Updated At"
                    value={assembleDate(portfolio?.updatedAt)}
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={busy}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={true}
                  >
                    update
                  </LoadingButton>
                </Box>
                <NewImage
                  portfolioId={portfolio.id}
                  busyState={[busy, setBusy]}
                  setImages={setImages}
                />
              </Grid>
            </Grid>
            <Backdrop show={busy} />
          </Container>
        </Box>
      </main>
    );
  }
);
