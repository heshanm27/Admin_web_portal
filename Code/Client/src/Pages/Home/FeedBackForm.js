import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import idGenarator from "../../component/IdGenrarator/RandomID";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Notification from "../../component/Notification/Notification";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material/styles";
import {
  colorchange,
  dateFormatter,
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";

const FuelType = [
  { id: "Petrol", title: "Petrol " },
  { id: "diesel", title: "Diesel" },
];

const Transmission = [
  { id: "Manual", title: "Manual" },
  { id: "Automatic", title: "Automatic" },
  { id: "Semi-automatic", title: "Semi-automatic" },
  { id: "other", title: "Other" },
];
const userStyle = makeStyles((theme) => ({
  submit: {
    marginTop: "20px",
  },
  inputs: {
    display: "none",
  },
  img: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
  },
  emptyStar: {
    color: "white",
  },
}));

const initialValues = {
  Feedback_ID: "",
  Feedback_Date: "",
  FeedbackMsg: "",
  Rate: 0,
};

export default function FeedBackForm() {
  const classes = userStyle();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#1976d2",
    },
    "& .MuiRating-iconHover": {
      color: "#42a5f5",
    },
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //error handle
  const validate = () => {
    let temp = {};
    temp.FeedbackMsg = values.FeedbackMsg ? "" : "This Field is Required";
    temp.Rate = values.Rate ? "" : "This Field is Required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  //api call

  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("FeedBack/add", claim);
  };

  //useMutation
  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully added",
        type: "success",
      });
      setValues(initialValues);
    },
    onError: (error) => {
      console.log(error.response);

      const message = error.response.data.error;
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${message}`,
        type: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("hello");
      add.mutate(values);
      // setNotify({
      //   isOpen: true,
      //   message: "Successfully Feedback added",
      //   type: "success",
      // });
    }
  };

  function demo() {
    setValues({
      ["Feedback_ID"]: idGenarator("GMF"),
    });
  }

  useEffect(() => {
    let day = dateFormatter(new Date());
    setValues({
      ...values,
      Feedback_ID: idGenarator("GMF"),
      Feedback_Date: day,
    });
  }, []);
  return (
    <Container component="main">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Stack direction="row">
              Rate-:
              <StyledRating
                id="Rate"
                name="Rate"
                defaultValue={2}
                value={values.Rate}
                onChange={handleChanges}
                precision={0.5}
                size="large"
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={
                  <StarBorderIcon
                    fontSize="inherit"
                    className={classes.emptyStar}
                  />
                }
              />
              {/* <StyledRating
                id="Rate"
                name="Rate"
                value={values.Rate}
                onChange={handleChanges}
                precision={0.5}
                size="large"
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={
                  <FavoriteBorderIcon
                    fontSize="inherit"
                    className={classes.emptyStar}
                  />
                }
              /> */}
            </Stack>

            <TextField
              id="outlined-multiline-static"
              label="Your Message"
              name="FeedbackMsg"
              multiline
              color="primary"
              variant="filled"
              focused
              rows={5}
              fullWidth
              error={errors.FeedbackMsg}
              inputProps={{ style: { color: "white" } }}
              sx={{ marginTop: "20px" }}
              value={values.FeedbackMsg}
              onChange={handleChanges}
              defaultValue="Default Value"
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center">
              <LoadingButton
                //   loading={loading}
                loadingPosition="start"
                variant="contained"
                type="submit"
                style={{ margin: "20px" }}
              >
                Enter Feedback
              </LoadingButton>
              {/* <Button onClick={demo}>demo</Button> */}
              <Notification notify={notify} setNotify={setNotify} />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
