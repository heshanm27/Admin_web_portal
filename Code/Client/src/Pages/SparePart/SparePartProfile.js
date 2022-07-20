import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { Chip, Container } from "@mui/material";
import Notification from "../../component/Notification/Notification";
import { colorchange } from "../../component/IdGenrarator/ColorChanger";
import { useSelector } from "react-redux";

export default function SparePartQuotationsOrder() {
  const [result, setResult] = useState([]);
  const queryClient = useQueryClient();
  const { curruntUserId, curruntUserName } = useSelector((state) => state.user);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  async function fetchReservation() {
    const res = await publicRequest.get(`Quotations/get/${curruntUserId}`);
    return res;
  }
  const statuses = {
    Pending: "Pending",
    Complete: "Complete",
    Approved: "Approved",
    Rejected: "Rejected",
  };

  function conditon(status) {
    switch (status) {
      case "Complete":
        return false;
      case "Pending":
        return true;
      case "Approved":
        return true;
      case "Rejected":
        return true;
    }
  }
  const [columns, setColumns] = useState([
    {
      title: "OrderID",
      field: "OrderID",
    },
    {
      title: "Item Name",
      field: "ItemName",
      sorting: false,
      searchable: false,
    },
    {
      title: "Quantity",
      field: "Quantity",
      sorting: false,
      searchable: false,
    },
    {
      title: "Order Total",
      field: "OrderPrice",
      searchable: false,
    },
    {
      title: "Status",
      field: "Status",
      render: (rowData) => (
        <Chip
          label={rowData.Status}
          color={colorchange(rowData.Status)}
          variant="outlined"
        />
      ),
    },
  ]);

  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Reservation"],
    () => fetchReservation()
  );
  //Api Calls

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`Reservation/delete/${id}`);
  };

  //useMutation

  //delete
  const deleteReq = useMutation(deleteClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully Deleted",
        type: "success",
      });

      queryClient.invalidateQueries("Reservation");
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const payload = data.data.Quotation;
      console.log(payload);
      setResult(payload);
    }

    if (isError) {
      setNotify({
        isOpen: true,
        message: `Error Occurd ${error}`,
        type: "error",
      });
    }

    //
  }, [data, error]);

  return (
    <Container component="main" maxWidth="xl">
      <MaterialTable
        title="Your Quotations Request"
        columns={columns}
        data={result}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              const id = oldData._id;
              console.log(id);
              console.log(oldData);
              deleteReq.mutate(id);
              resolve();
            }),
        }}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}
