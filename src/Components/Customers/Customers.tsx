import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteCUstomer, GetCustomers } from "../Services/CustomerServices";
import { Customer } from "../Model/Customer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main, // Set background color to primary color
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Customers({ setEditId, setOpen, setEditData }: any) {
  const [customers, setCustomers] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const response = await GetCustomers();
      console.log("data", response);
      setCustomers(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCustomer = async (id: number) => {
    try {
      const deletionResult = await DeleteCUstomer(id); // Renamed variable
      alert("Deleted Successfully");
      fetchData();
    } catch (error) {
      alert(`An error occurred: ${error}`);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleEditCustomer = (id: any, data: any) => {
    setEditId(id);
    setEditData(data);
    setOpen(true);
  };
  const handleOpenDialog = (id: number) => {
    setDeleteCustomerId(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer: any) => (
              <StyledTableRow key={customer.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {customer.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.phone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleEditCustomer(customer.id, customer)}
                    color="secondary"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDialog(customer.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteCustomer(deleteCustomerId!)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Customers;
