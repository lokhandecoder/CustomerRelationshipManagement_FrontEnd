import React, { useEffect, useState } from "react";
import Contacts from "../Contacts/Contacts";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CreateContacts, UpdateContacts } from "../Services/ContactsServices";
import LayoutComponent from "../Fixed/LayoutComponent";

function ContactsPage() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<any>(0);
  const [editData, setEditData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    id: 0,
    name: "",
    position: "",
    customer_id: 0,
    email: "",
    phone: "",
  });
  const [customername, setcustomername] = useState<any>([]);

  const handleAddCustomer = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData?.id,
        name: editData?.name,
        position: editData?.position,
        customer_id: editData?.customer_id,
        email: editData?.email,
        phone: editData?.phone,
      });
    } else {
      setFormData({
        id: 0,
        name: "",
        position: "",
        customer_id: "",
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
      position: "",
      customer_id: "",
      email: "",
      phone: "",
    });
  };
  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAdd = async () => {
    alert(editId)
    console.log("send:", formData); // Logging all fields value

    if (editId) {
      const updateData = await UpdateContacts(editId, formData);
      if (updateData) {
        alert("Successfully Updated customer!");
        window.location.reload();
      } else {
        alert("Failed to add customer!");
      }
    } else {
      const sendData = await CreateContacts(formData);
      if (sendData) {
        alert("Successfully added customer!");
        window.location.reload();
      } else {
        alert("Failed to add customer!");
      }
    }

    handleClose();
  };
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function customer_nmae(custmerId: number) {
    const customer = customername.find((item: any) => item.id === custmerId);
    return customer.name;
  }
  return (
    <div>
      <LayoutComponent>
        <div
          style={{ justifyContent: "right", display: "flex", marginBottom: 10 }}
        >
          <Button
            variant="contained"
            onClick={handleAddCustomer}
            color="primary"
          >
            Add Contacts
          </Button>
        </div>
        <Contacts
          setcustomername={setcustomername}
          customer_nmae={customer_nmae}
          setEditData={setEditData}
          setEditId={setEditId}
          setOpen={setOpen}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
            {editId ? "Edit Contacts" : "Add Contacts"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
              sx={{ marginTop: 2 }}
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
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.position}
                label="Position"
                onChange={handleChange}
                name="position"
              >
                <MenuItem value={"Developer"}>Developer</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"Lead Engineer"}>Lead Engineer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Customer Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.customer_id}
                label="Custmer Name"
                onChange={handleChange}
                name="customer_id"
              >
                {customername?.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} color="warning">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAdd} color="success">
              {editId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </LayoutComponent>
    </div>
  );
}

export default ContactsPage;
