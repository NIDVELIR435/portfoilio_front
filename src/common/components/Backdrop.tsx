import { Backdrop as BackdropMui, CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";

export const Backdrop: FC<{ show: boolean }> = ({
  show = false,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <BackdropMui
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </BackdropMui>
  );
};
