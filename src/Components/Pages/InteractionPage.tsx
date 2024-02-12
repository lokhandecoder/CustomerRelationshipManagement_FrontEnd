import React, { useEffect, useState } from "react";
import LayoutComponent from "../Fixed/LayoutComponent";
import Interactions from "../Interactions/Interactions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { CreateInteraction, GetInteractions, UpdateInteraction } from "../Services/InteractionServices";
import { GetConatcts } from "../Services/ContactsServices";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";

function InteractionPage() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<any>(0);
  const [editData, setEditData] = useState<any>(null);
  const [interactions, setInteractions] = useState<any>([]);
  const [conatcts, setconatcts] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    id: 0,
    content: "",
    contact_id: 0,
  });

  const fetchData = async () => {
    try {
      const getdata = await GetInteractions();
      const getCustomer = await GetConatcts();
      setconatcts(getCustomer);
      setInteractions(getdata);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  function GetCustomerName(id: number) {
    let customer = conatcts.find((item: any) => item.id === id);
    return customer.name;
  }

  const handleAddInteraction = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData?.id,
        content: editData?.content,
        contact_id: editData?.contact_id,
      });
    } else {
      setFormData({
        id: 0,
        content: "",
        contact_id: 0,
      });
    }
  }, [editData]);
  const handleClose = () => {
    setOpen(false);
    setEditId(0);
    setEditData(null);
    setFormData({
      id: 0,
      content: "",
      contact_id: 0,
    });
  };
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAdd = async () => {
    console.log(formData); // Logging all fields value
    if (editId) {
      const updateData = await UpdateInteraction(editId, formData);
      if (updateData) {
        alert("Successfully Updated customer!");
        window.location.reload();
      } else {
        alert("Failed to add customer!");
      }
    } else {
      const sendData = await CreateInteraction(formData);
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
          <Button
            variant="contained"
            onClick={handleAddInteraction}
            color="primary"
          >
            Add Content
          </Button>
        </div>
        <Interactions
          GetCustomerName={GetCustomerName}
          interactions={interactions}
          setEditData={setEditData}
          setEditId={setEditId}
          setOpen={setOpen}

        />
      </LayoutComponent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {editId ? "Edit Content" : "Add Content"}
        </DialogTitle>
        <DialogContent sx={{ width: '80%', margin: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Content"
                placeholder="Enter the content"
                type="text"
                fullWidth
                name="content"
                multiline
                value={formData.content}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">Contacts</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.contact_id}
                  label="contact_id"
                  onChange={handleChange}
                  name="contact_id"
                >
                  {conatcts.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
    </>
  );
}

export default InteractionPage;
