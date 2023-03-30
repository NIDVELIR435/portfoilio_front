//modules
import * as React from "react";

//components
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Copyright from "../../common/components/copyright";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

//styles
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ErrorOutlineOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            404 Not Found
          </Typography>
        </Box>
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Copyright sx={{ mt: 1, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
