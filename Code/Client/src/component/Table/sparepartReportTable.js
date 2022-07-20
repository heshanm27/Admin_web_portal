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
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";
import { LoadingButton } from "@mui/lab";
import { OneKPlusOutlined } from "@mui/icons-material";

//fetch data
async function fetchClaims() {
  const res = await publicRequest.get(`warrenty/report`);
  return res;
}

const userStyle = makeStyles((theme) => ({
  roots: {
    marginTop: "50px",
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
export default function SparepartReportpopUpTable({ props }) {
  const {
    duration,
    reportID,
    time,
    reportData,
    reportDate,
    TotalProfit,
    Totalexpence,
  } = props;

  const classes = userStyle();
  const [reportDates, setReportDate] = useState();
  const [reportTime, setReportTime] = useState(time);
  const [reportIDs, setreportID] = useState(reportID);
  const [periode, setperiode] = useState(duration);
  const [isEmpty, setisEmpty] = useState(true);
  const [isload, setisload] = useState(false);
  // const [rows, setRows] = useState(reportData);

  useEffect(() => {
    // setReportDate(dateFormatter(reportDate));
  }, []);

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
            <Typography>Monthly Sparepart Report</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography>Time Duration: {props.duration} </Typography>
                  <Typography> Generated Date: {reportDates}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
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
                  <TableCell>Sparepart ID</TableCell>
                  <TableCell>ItemName</TableCell>
                  <TableCell>Available Item Count</TableCell>
                  <TableCell>Used Item Count</TableCell>
                  <TableCell align="right">Expence</TableCell>
                  <TableCell align="right">Profit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow
                    key={row.VehicleNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.SparepartID}</TableCell>
                    <TableCell>{row.ItemName}</TableCell>
                    <TableCell>{row.Available}</TableCell>
                    <TableCell>{row.Used}</TableCell>
                    <TableCell align="right">
                      {numberWithCommas(row.Expence)}
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(row.Profit)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={2}>Total Expences</TableCell>
                  <TableCell align="right">
                    {numberWithCommas(Totalexpence)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={2}>Total Profit</TableCell>
                  <TableCell align="right">
                    {numberWithCommas(TotalProfit)}
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
