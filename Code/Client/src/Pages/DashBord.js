import {
  Button as btn,
  Container,
  Typography,
  Paper,
  CssBaseline,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  Grid,
  TableSortLabel,
  Toolbar,
  InputAdornment,
  Button,
  IconButton,
  Stack,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { purple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Autocomplete, Skeleton } from "@mui/material";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
// import PopUp from "../component/PopUp";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import Img from "../resource/img/undraw_welcome.svg";
import DashTable from "./DashBordTable/DashTable";
// import EngineForm from "./FormPage/EngineForm";
// import Notification from "../component/Notification/Notification";
// import ConfirmDialog from "../component/ConfirmDialog/ConfirmDialog";

const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
    marginTop: "30px",
    backgroundColor: theme.palette.background.paper,
  },

  paper: {
    [theme.breakpoints.up("sm")]: {
      padding: "40px",
    },
    marginTop: "20px",
    height: "auto",
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.text,
    },
    "& tbody td": {
      fontWeight: "400",
    },
    "& tbody tr:hover":
      theme.palette.mode === "dark"
        ? {
            backgroundColor: theme.palette.grey.A400,
            cursor: "pointer",
          }
        : {
            backgroundColor: theme.palette.grey[300],
            cursor: "pointer",
          },
  },
  main: {
    [theme.breakpoints.down("md")]: {
      padding: "50px 5px",
    },
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    width: "70%",
  },

  secondary: {
    backgroundColor: theme.palette.info.dark,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
    margin: theme.spacing(0.5),
  },
  editIcon: {
    "&.MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  deleteIcon: {
    "&.MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  primary: {
    backgroundColor: theme.palette.error.light,
    "& .MuiButton-label": {
      color: theme.palette.primary.light,
    },
  },
  box: {
    margin: "20px",
    background: "linear-gradient(to right, #0099ff -9%, #3333cc 100%)",
    width: "100%",
    height: "100px",
    borderRadius: "20px",
  },
  img: {
    width: "15%",
    marginRight: "-40px",
    marginTop: "-30px",
    marginBottom: "-30px",
  },
  typosub: {
    marginLeft: "80px",
    marginTop: "-20px",
    color: "#23538A",

    // background: "linear-gradient(to left, #A7CFDF 40%, #23538A 0%)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
  },
}));

const Dashbord = () => {
  const classes = userStyle();

  return (
    <div className={classes.roots} id="review">
      <Container maxWidth="lg">
        <Box className={classes.box}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="h4"
              align="right"
              sx={{ marginLeft: "50px", marginTop: "10px", color: "white" }}
            >
              Welcome
            </Typography>
            <img src={Img} className={classes.img} />
          </Stack>
          <Stack direction="row">
            <Typography variant="h6" className={classes.typosub}>
              Having Good Day ?
            </Typography>
          </Stack>
        </Box>
        <Grid container>
          <Grid item xs={6} spacing={2}>
            <iframe
              style={{
                background: "#FFFFFF",
                border: " none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                width: "90%",
                height: "350px",
              }}
              width="640"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-ecodo/embed/charts?id=627dbb01-5476-4885-84be-a9e18428407b&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <iframe
              style={{
                background: "#FFFFFF",
                border: " none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                width: "90%",
                height: "350px",
              }}
              width="640"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-ecodo/embed/charts?id=628704ed-03f7-44cf-8ef0-9cae4adf9668&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </Grid>
        </Grid>
        <DashTable />
      </Container>
    </div>
  );
};

export default Dashbord;
