import * as React from "react";

//components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//constants
import { reactAppName } from "../constants/names.constant";

function Copyright(props: { sx: { mt: number; mb: number } }) {
  return (
    <Box
      sx={{ position: "fixed", bottom: -20, left: 0, right: 10 }}
      component="footer"
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="right"
        {...props}
      >
        {`Copyright © ${reactAppName} ${new Date().getFullYear()}.`}
      </Typography>
    </Box>
  );
}

export default Copyright;
