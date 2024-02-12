// CustomerPage.js

import React, { useEffect, useState } from "react";
import Customers from "../Customers/Customers";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Customer } from "../Model/Customer";
import { CreateCustomer, UpdateCustomer } from "../Services/CustomerServices";
import LayoutComponent from "../Fixed/LayoutComponent";

function CustomerPage() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<any>(0);
  const [editData, setEditData] = useState<any>(null);
  const [formData, setFormData] = useState<Customer>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });

  
  const handleAddCustomer = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData?.id,
        name: editData?.name,
        phone: editData?.phone,
        email: editData?.email,
      });
    } else {
      setFormData({
        id: 0,
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [editData]);
  const handleClose = () => {
    setOpen(false);
    setEditId(0);
    setEditData(null);
    setFormData({
      id: 0,
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleAdd = async () => {
    console.log(formData); // Logging all fields value
    if (editId) {
      const updateData = await UpdateCustomer(editId, formData);
      if (updateData) {
        alert("Successfully Updated customer!");
        window.location.reload();
      } else {
        alert("Failed to add customer!");
      }
    } else {
      const sendData = await CreateCustomer(formData);
      if (sendData) {
        alert("Successfully added customer!");
        window.location.reload();
      } else {
        alert("Failed to add customer!");
      }
    }

    handleClose();
  };

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
     <LayoutComponent>
     <div
        style={{ justifyContent: "right", display: "flex", marginBottom: 10 }}
      >
        <Button variant="contained" onClick={handleAddCustomer} color="primary">
          Add Customer
        </Button>
      </div>
      <Customers
        setEditId={setEditId}
        setOpen={setOpen}
        setEditData={setEditData}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {editId ? "Edit Customer" : "Add Customer"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="warning">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAdd} color="success">
            {
              editId ? "Update" : "Add"
            }
          </Button>
        </DialogActions>
      </Dialog>
     </LayoutComponent>
    </>
  );
}

export default CustomerPage;
