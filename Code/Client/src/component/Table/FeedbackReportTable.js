//Reservation report table
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Logo from "../../resource/img/Logo/Logo.jpg";
import makeStyles from "@mui/styles/makeStyles";
import Genrator from "../../component/IdGenrarator/RandomID";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import Notification from "../../component/Notification/Notification";
import {
  colorchange,
  dateFormatter,
  timeFormatter,
  getMonthe,
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";
import { LoadingButton } from "@mui/lab";

const userStyle = makeStyles((theme) => ({
  roots: {
    marginTop: "20px",
    marginBottom: "50px",
    border: "1px",
    borderColor: "rgba(255,255,255,0.)",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
  },
  container: {
    border: "1px solid black",
  },
  box: {
    marginTop: "20px",
  },
}));
export default function FeedBackReportPopUptable({ props }) {
  const {
    duration,
    reportID,
    time,
    reportData,
    reportDate,
    Totalresponse,
    Avaragerate,
  } = props;
  const classes = userStyle();
  const curruntData = [];
  const [reportDates, setReportDate] = useState(dateFormatter(reportDate));
  const [reportTime, setReportTime] = useState(time);
  const [reportIDs, setreportID] = useState(reportID);
  const [periode, setperiode] = useState(duration);
  const [isEmpty, setisEmpty] = useState(true);
  const [isload, setisload] = useState(false);
  const [rows, setRows] = useState(reportData);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (reportDates.length != 0) {
      setisEmpty(false);
    } else {
      setisEmpty(true);
    }
  }, [rows]);

  return (
    <div className={classes.roots}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.box}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Avatar src={Logo} sx={{ width: 75, height: 75 }}></Avatar>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            sx={{ margin: "20px" }}
          >
            <Typography component="h2" variant="h5">
              Gallage Moters (pvt) Ltd.
            </Typography>
            <Typography>
              Contact:0771423837 Email: GallageMotors@gmail.com
            </Typography>
            <Typography>Monthly FeedBack Report</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography>Time Duration: {periode} </Typography>
                  <Typography> Generated Date: {reportDates}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography> Report ID: {reportIDs} </Typography>
                  <Typography> Generated Time: {reportTime} </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>FeedBack No</TableCell>
                  <TableCell>date of FeedBack</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isEmpty &&
                  [1, 2, 3, 4, 5, 6].map((item) => {
                    return (
                      <TableRow
                        key={item}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {!isEmpty &&
                  rows.map((row, index) => (
                    <TableRow
                      key={row.VehicleNo}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.Feedbackid}</TableCell>
                      <TableCell>{dateFormatter(row.Feedbackdate)}</TableCell>
                      <TableCell>{row.FeedbackMsg}</TableCell>
                      <TableCell>{row.Rate}</TableCell>
                    </TableRow>
                  ))}

                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={1}>Avg Rate -: </TableCell>
                  <TableCell>{Avaragerate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={1}>Total Response -:</TableCell>
                  <TableCell>{Totalresponse}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
