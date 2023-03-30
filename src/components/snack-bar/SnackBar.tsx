//modules
import { useEffect, useState, SyntheticEvent, Fragment } from "react";

//components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

//typs
import { SeverityLevel } from "../../common/types/snack-bar-level.type";

export const SimpleSnackbar = ({
  severity = "info",
  show,
  message,
}: {
  severity: SeverityLevel;
  show: boolean;
  message: string;
}): JSX.Element => {
  const [open, setOpen] = useState(true);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={5000}
        onClose={handleClose}
        action={action}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
};
