import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  colorchange,
  dateFormatter,
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";
export default function SparePartCardTable(props) {
  const { items } = props;
  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left">Item Name</TableCell>
              <TableCell align="left">{items.ItemName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Mileage</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="justify">{items.ItemDiscription}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">
                {numberWithCommas(items.UnitSellingPrice)} LKR
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
