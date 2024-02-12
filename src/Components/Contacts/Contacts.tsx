import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteContacts, GetConatcts } from "../Services/ContactsServices";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GetCustomers } from "../Services/CustomerServices";

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

function Contacts({
  setcustomername,
  customer_nmae,
  setEditData,
  setEditId,
  setOpen,
}: any) {
  const [contacts, setContacts] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const getContacts = await GetConatcts();
      const response = await GetCustomers();
      setcustomername(response);
      console.log("data:", getContacts);
      console.log("customers", response);
      setContacts(getContacts);
    } catch (error) {
      console.error("Error fetching conatcts:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpenDialog = (id: number) => {
    setDeleteCustomerId(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleDeleteCustomer = async (id: number) => {
    try {
      const deletionResult = await DeleteContacts(id); // Renamed variable
      alert("Deleted Successfully");
      fetchData();
    } catch (error) {
      alert(`An error occurred: ${error}`);
    } finally {
      setIsDialogOpen(false);
    }
  };
  const hanldeEditContacts = (id: any, data: any) => {
    setEditId(id);
    setEditData(data);
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((customer: any) => (
              <StyledTableRow key={customer.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {customer.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.position}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer_nmae(customer.customer_id)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => hanldeEditContacts(customer.id, customer)}
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
            Are you sure you want to delete this Contacts?
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

export default Contacts;
