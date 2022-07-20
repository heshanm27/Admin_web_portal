import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
const useStyle = makeStyles((theme) => ({
  displaywraper: {
    padding: theme.spacing(1),
    position: "absolute",
    top: theme.spacing(1),
    width: "100%",
  },
  iconbtn: {
    "&.MuiIconButton-colorPrimary": {
      color: theme.palette.error.light,
    },
    "&:hover": {
      backgroundColor: "#ffcdd2",
    },
  },
}));

export default function BidPopUp(props) {
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { title, children, openPopup, setOpenPopUp } = props;
  return (
    <Dialog
      open={openPopup}
      maxWidth="sm"
      classes={{ paper: classes.displaywraper }}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography varient="h6" component="div" style={{ flexGrow: "1" }}>
            {title}
          </Typography>
          <IconButton
            color="primary"
            className={classes.iconbtn}
            onClick={() => setOpenPopUp(false)}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
