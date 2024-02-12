import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteInteraction, GetInteractions } from "../Services/InteractionServices";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GetConatcts } from "../Services/ContactsServices";

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
function Interactions({
  GetCustomerName,
  interactions,
  setEditData,
  setEditId,
  setOpen,
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    setDeleteCustomerId(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleDeleteCustomer = async (id: number) => {
    try {
        const deletionResult = await DeleteInteraction(id); // Renamed variable
      alert("Deleted Successfully");
      window.location.reload();
      //   fetchData();
    } catch (error) {
      alert(`An error occurred: ${error}`);
    } finally {
      setIsDialogOpen(false);
    }
  };
  const handleeditinteraction = (id: any, data: any) => {
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
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center">Contact Person </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interactions.map((customer: any) => (
              <StyledTableRow key={customer.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {customer.content}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {customer.contact_id} */}
                  {GetCustomerName(customer.contact_id)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleeditinteraction(customer.id, customer)}
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

export default Interactions;
