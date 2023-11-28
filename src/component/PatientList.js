import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Dialog, DialogActions, Button, DialogContent, TextField, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const PatientList = ({ patients, setPatients }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const handleDelete = (index) => {
    setOpenConfirmDialog(true);
    setEditIndex(index);
  };

  const confirmDelete = () => {
    setPatients(patients.filter((_, idx) => idx !== editIndex));
    setOpenConfirmDialog(false);
  };

  const handleEdit = (index) => {
    setCurrentPatient(patients[index]);
    setEditIndex(index);
    setOpenEditDialog(true);
  };

  const handleEditChange = (event) => {
    setCurrentPatient({ ...currentPatient, [event.target.name]: event.target.value });
  };

  const saveEdit = () => {
    const updatedPatients = [...patients];
    updatedPatients[editIndex] = currentPatient;
    setPatients(updatedPatients);
    setOpenEditDialog(false);
  };

  return (
    <List style={{ width: '100%' }}>
      {patients.map((patient, index) => (
        <Paper key={index} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={`ID: ${index + 1} - ${patient.firstName} ${patient.lastName}`} />
            <div>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        </Paper>
      ))}

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogContent>Are you sure you want to delete this patient?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>No</Button>
          <Button onClick={confirmDelete}>Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField fullWidth label="First Name" name="firstName" value={currentPatient.firstName || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Last Name" name="lastName" value={currentPatient.lastName || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Age" name="age" value={currentPatient.age || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Occupation" name="occupation" value={currentPatient.occupation || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="OLD RX: OD" name="oldRx" value={currentPatient.oldRx || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="NEW RX: OD" name="newRx" value={currentPatient.newRx || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Frame" name="frame" value={currentPatient.frame || ''} onChange={handleEditChange} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={saveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default PatientList;
