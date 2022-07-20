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
import Notification from "../../component/Notification/Notification";
import {
  colorchange,
  dateFormatter,
  timeFormatter,
  getMonthe,
} from "../../component/IdGenrarator/ColorChanger";
import { LoadingButton } from "@mui/lab";
import { OneKPlusOutlined } from "@mui/icons-material";

const userStyle = makeStyles((theme) => ({
  roots: {
    marginTop: "10px",
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
    padding: "10px",
  },
  box: {
    marginTop: "20px",
  },
}));
export default function WarrantyReportView({ props }) {
  const {
    duration,
    reportID,
    time,
    reportData,
    reportDate,
    TotalClaimed,
    TotalIssue,
    TotalExpired,
  } = props;
  const classes = userStyle();
  const [reportDates, setReportDate] = useState(dateFormatter(reportDate));
  const [reportTime, setReportTime] = useState(time);
  const [reportIDs, setreportID] = useState(reportID);
  const [periode, setperiode] = useState(duration);
  const [isEmpty, setisEmpty] = useState(true);
  const [isload, setisload] = useState(false);
  const [rows, setRows] = useState(reportData);

  useEffect(() => {}, [rows]);
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
            <Typography>Monthly Warranty Report</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography>Time Duration: {props.duration} </Typography>
                  <Typography> Generated Date: {reportDates}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography> Report ID: {reportID} </Typography>
                  <Typography> Generated Time: {time} </Typography>
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
                  <TableCell>Warranty No</TableCell>
                  <TableCell>date of Repair</TableCell>
                  <TableCell>expire Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow
                    key={row.warrentyNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.warrentyNo}</TableCell>
                    <TableCell>{dateFormatter(row.dateofRepair)}</TableCell>
                    <TableCell>{dateFormatter(row.expireDate)}</TableCell>
                    <TableCell align="right">{row.Status}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={1}>Total Claimed -: </TableCell>
                  <TableCell align="right">
                    <Typography component="h1" variant="h6">
                      {TotalClaimed}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={1}> Total Issue -: </TableCell>
                  <TableCell align="right">
                    <Typography component="h1" variant="h6">
                      {TotalIssue}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={1}>Total Expired -: </TableCell>
                  <TableCell align="right">
                    <Typography component="h1" variant="h6">
                      {TotalExpired}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}
