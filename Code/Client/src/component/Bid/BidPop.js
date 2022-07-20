import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

import Inputprop from "../../component/Inputs/Input";

import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  colorchange,
  dateFormatter,
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import Notification from "../../component/Notification/Notification";
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
}));

export default function BidPop(prop) {
  const { curruntUserId } = useSelector((state) => state.user);
  const { props, setOpenPopUp, setNotify } = prop;
  const { VehicleNo, Price: initPrice, _id: vid } = props;
  const classes = userStyle();
  const [values, setValues] = useState();
  const [maxPrice, setMaxPrice] = useState(initPrice);
  const [errors, setErrors] = useState([]);
  const [grate, setGrate] = useState(false);
  const queryClient = useQueryClient();

  const handleChanges = (e) => {
    console.log(e.target.value);
    setValues(e.target.value);
  };

  //error handle
  const validate = () => {
    if (values > maxPrice) {
      setGrate(false);
    } else {
      setGrate(true);
    }
    let temp = {};

    temp = values ? "" : "This Field is Required";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  //   api call
  const updateClaims = (newData) => {
    const id = vid;
    console.log(id);
    return publicRequest.put(`Vehicle/bid/${id}`, newData);
  };

  //   update
  const updateReq = useMutation(updateClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Bid Palaced Successfully",
        type: "success",
      });

      queryClient.invalidateQueries("Vehicle");
      setOpenPopUp(false);
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
      setOpenPopUp(false);
    },
  });

  const handleSubmit = (e) => {
    console.log(props);
    e.preventDefault();
    if (validate()) {
      const obj = {
        uid: curruntUserId,
        value: values,
      };
      updateReq.mutate(obj);
    }
  };

  async function fetchClaims(id) {
    const res = await publicRequest.get(`vehicle//bidprcie/${id}`);
    setMaxPrice(res.data.max[0].max);
  }

  useEffect(() => {
    if (VehicleNo != null) {
      fetchClaims(VehicleNo);
    }
  }, [VehicleNo]);
  return (
    <Container component="main">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography>
              Starting Price :- {numberWithCommas(initPrice)} LKR{" "}
            </Typography>
            <Typography>
              Currunt highest Bid Price :- {numberWithCommas(maxPrice)} LKR{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Inputprop
              name="Price"
              label="Price"
              type="number"
              error={errors.Price}
              value={values}
              onChange={handleChanges}
            />
            {grate && (
              <Typography color={"red"}>
                "Price Must be Grater Than currunt highest bid Price"
              </Typography>
            )}

            <Typography variant="body2" color={"InfoText"}>
              Winner of the auction requires to make an immediate payment of
              Rs.200,000/- to reserve the vehicle.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center">
              <LoadingButton
                //   loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                style={{ margin: "20px" }}
              ></LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
