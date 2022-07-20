import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Pagination from "@mui/material/Pagination";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Header from "../../component/Menu/ClientMenu";
import Footer from "../../Pages/Home/Footer";
import { Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Notification from "../../component/Notification/Notification";
import usePagination from "../../component/Pagenation/Pagination";
import SparePartCardTable from "../../component/Table/storeSparePartTable";
import { publicRequest, userRequest } from "../../axiosRequest/defaultAxios";
import {
  colorchange,
  dateFormatter,
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";
import BidPopUp from "../../component/PopUp/BidPopUp";
import QuotationsPopUp from "../../component/Bid/QuotationsPopUp";
import { motion } from "framer-motion";
const useStyle = makeStyles((theme) => ({
  roots: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  main: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(7),
      height: "auto",
    },
    height: "50vh",
    padding: "0",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  titleBOx: {
    marginTop: "15%",
  },
  cards: {
    marginTop: "10%",
  },
  media: {
    height: "180px",
  },
  Cardcontent: {
    justifyContent: "center",
    alignItems: "center",
    Height: "600px",
  },
  cardroot: {
    maxHeight: "500px",
    display: "block",
    transitionDuration: "0.3s",

    [theme.breakpoints.up("sm")]: {
      height: "45vw",
    },
  },
  search: {
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardActionBtn: {
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  },
}));

export default function Vehicle() {
  const classes = useStyle();
  const [vehicles, setVehicls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState(null);
  const [openPopup, setOpenPopUp] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const popUpPdf = (data) => {
    setParams(data);
    setOpenPopUp(true);
  };

  const [searchFilter, setSearchFilter] = useState({
    fn: (items) => {
      return items;
    },
  });
  //pagination

  const [page, setPage] = useState(0);
  const PER_PAGE = 5;

  const handleSearch = (e) => {
    let target = e.target.value.toLowerCase();
    console.log(e.target.value.toLowerCase());
    setSearchFilter({
      fn: (items) => {
        if (target == "") return items;
        else return items.filter((x) => x.Brand.includes(target));
      },
    });
  };

  const _DATA = usePagination(searchFilter.fn(vehicles), PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);

    _DATA.jump(p);
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await publicRequest.get("SparePart/getAll");

      if (data) {
        console.log(data.data.SpareParts);
        setVehicls(data.data.SpareParts);
        setIsLoading(false);
      } else {
        setVehicls({});
      }
    } catch (err) {
      console.log(err.message);
      if (err.message === "Network Error") {
        setNotify({
          isOpen: true,
          message: "Server Error",
          type: "error",
        });
      } else {
        setNotify({
          isOpen: true,
          message: err.response.data.error,
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />

      <div className={classes.roots}>
        <Box className={classes.cards}>
          <Container component="main" maxWidth="lg">
            <motion.div layout>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Toolbar>
                    {/* <TextField
                      size="small"
                      className={classes.search}
                      color="secondary"
                      label="Search field"
                      variant="outlined"
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                  </Toolbar>
                </Grid>
                {isLoading &&
                  [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                    return (
                      <Grid item key={item} xs={12} sm={6} md={4}>
                        <div
                          style={{
                            marginBottom: "20px",
                            padding: "20px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton variant="rect" width={280} height={118} />
                          <Skeleton width="60%" />
                          <Skeleton width="60%" />
                        </div>
                      </Grid>
                    );
                  })}

                {!isLoading &&
                  _DATA.currentData().map((item) => {
                    return (
                      <Grid item key={item._id} xs={12} sm={6} md={4}>
                        <motion.div layout>
                          <Card className={classes.cardroot}>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image={item.imgUrl}
                                title={item.ItemName}
                              />
                              <CardContent className={classes.Cardcontent}>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  {item.ItemName}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  component="h2"
                                >
                                  {item.ItemDiscription}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  component="h2"
                                >
                                  {numberWithCommas(item.UnitSellingPrice)} LKR
                                </Typography>
                                {/* <SparePartCardTable items={item} /> */}
                              </CardContent>
                            </CardActionArea>
                            <CardActions style={{ justifyContent: "center" }}>
                              <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                className={classes.cardActionBtn}
                                onClick={() => popUpPdf(item)}
                              >
                                Quotation
                              </Button>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    );
                  })}
              </Grid>
            </motion.div>
          </Container>
        </Box>
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0",
            height: "10vh",
          }}
        >
          <Pagination
            count={_DATA.maxPage}
            color="primary"
            page={page}
            onChange={handleChange}
          />
          <Notification notify={notify} setNotify={setNotify} />

          <BidPopUp
            title="Request Quotation"
            openPopup={openPopup}
            setOpenPopUp={setOpenPopUp}
          >
            <QuotationsPopUp
              props={params}
              setOpenPopUp={setOpenPopUp}
              setNotify={setNotify}
            />
          </BidPopUp>
        </Container>
      </div>
      <Footer />
    </>
  );
}
