//modules
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

//components
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import Copyright from "../../../common/components/Copyright";
import { SimpleSnackbar } from "../../snack-bar/SnackBar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

//utils
import { delay } from "lodash";

//types
import { Portfolio } from "../../../stores/types/portfolio.type";
import { SeverityLevel } from "../../../common/types/snack-bar-level.type";

//store
import { StoreContext } from "../../../stores/store.context";

export const NewPortfolio: React.FC = (): JSX.Element => {
  const [busy, setBusy] = useState<boolean>(false);
  const [redirect, setRedirect] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] =
    useState<SeverityLevel>("info");
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const { portfolioService } = useContext(StoreContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const partialEntity: Omit<Portfolio, "id" | "createdAt" | "updatedAt"> = {
      name: data.get("name") as string,
      description: (data.get("description") as string) ?? null,
    };

    setBusy(true);
    const { severity, message } = await portfolioService.create(partialEntity);

    setSnackBarSeverity(severity);
    setSnackBarMessage(message);
    setOpenSnackBar(true);
    setBusy(false);

    delay(() => {
      setOpenSnackBar(false);
      if (severity === "success") setRedirect(true);
    }, 1000);
  };

  return redirect ? (
    <Navigate to="list" />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <CreateNewFolder />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Portfolio
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={14}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                disabled={busy}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                fullWidth
                id="description"
                label="Description"
                autoFocus
                disabled={busy}
              />
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            fullWidth
            loading={busy}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright sx={{ mt: 1, mb: 4 }} />
      </Box>
      <SimpleSnackbar
        severity={snackBarSeverity}
        show={openSnackBar}
        message={snackBarMessage}
      />
    </Container>
  );
};
