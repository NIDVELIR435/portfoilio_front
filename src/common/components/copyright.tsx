import Typography from "@mui/material/Typography";
import {reactAppName} from "../constants/names.constant";
import * as React from "react";

function Copyright(props: { sx: {mt: number, mb: number }}) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {`Copyright © ${reactAppName} ${new Date().getFullYear()}.`}
        </Typography>
    );
}

export default Copyright;
