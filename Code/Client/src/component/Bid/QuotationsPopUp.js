import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

import Inputprop from "../Inputs/Input";

import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  colorchange,
  dateFormatter,
  numberWithCommas,
} from "../IdGenrarator/ColorChanger";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import Notification from "../Notification/Notification";
import Generate from "../../component/IdGenrarator/RandomID.js";
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

export default function QuotationsPopUp(prop) {
  const { curruntUserId, curruntUserName } = useSelector((state) => state.user);
  const { props, setOpenPopUp, setNotify } = prop;
  const { ItemName, UnitSellingPrice: initPrice, _id: sid } = props;
  const classes = userStyle();

  const initialValues = {
    Quantity: 1,
  };
  const [values, setValues] = useState(initialValues);
  const [OrderPrice, setOrderPrice] = useState(initPrice);
  const [maxPrice, setMaxPrice] = useState(initPrice);
  const [errors, setErrors] = useState([]);
  const [grate, setGrate] = useState(false);
  const [limit, setlimit] = useState(false);
  const queryClient = useQueryClient();
  const tot = 0;
  const handleChanges = (e) => {
    const { name, value } = e.target;
    calTotal(value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  function calTotal(value) {
    const tot = value * initPrice;
    console.log(value, tot, initPrice);
    if (tot <= 1000000) {
      setlimit(false);
      setOrderPrice(tot);
    } else {
      setlimit(true);
      setOrderPrice(1000000);
    }
  }

  const validate = () => {
    let temp = {};
    temp.Quantity = values.Quantity
      ? 0
      : "Can not Enter request without Quantity" || values.Quantity
      ? ""
      : "This Field is Required";
    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x == "");
  };

  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Quotations/add", claim);
  };

  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Quotation Placed Successfully",
        type: "success",
      });
      setOpenPopUp(false);
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
    console.log(props);
    e.preventDefault();
    if (validate()) {
      const obj = {
        OrderID: Generate("GMO"),
        UserID: curruntUserId,
        ItemName: ItemName,
        Quantity: values.Quantity,
        OrderPrice: OrderPrice,
        UserName: curruntUserName,
      };
      console.log(obj);
      add.mutate(obj);
    }
  };

  useEffect(() => {}, []);
  return (
    <Container component="main">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography>Item Name:- {ItemName}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Inputprop
              name="Quantity"
              label="Enter Quantity"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              error={errors.Quantity}
              value={values.Quantity}
              onChange={(e) => {
                handleChanges(e);
              }}
            />
            <Inputprop
              name="Price"
              label="Total Price"
              type="number"
              readonly
              value={OrderPrice}
            />

            <Typography variant="body2" color={"InfoText"}>
              Your Order Will Be review by our team and send additional details
              to your email
            </Typography>
            {limit && (
              <Typography variant="body2" color={"red"}>
                Maximum Order Amount is 1,000,000 lkr
              </Typography>
            )}
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
                Request
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
