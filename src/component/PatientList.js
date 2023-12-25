import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Dialog, DialogActions, Button, DialogContent, TextField, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSupabase } from '../context/SupabaseContext';


const PatientList = ({ patients, setPatients, }) => {
  const { deletePatient, fetchPatients, editPatient, readPatient } = useSupabase();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const [seed, setSeed] = useState(1);
  const reset = () => setSeed(Math.random());

  const handleDelete = (index) => {
    setOpenConfirmDialog(true);
    setEditIndex(index);
  };

  const confirmDelete = () => {
    deletePatient(editIndex);
    fetchPatients(setPatients);
    setOpenConfirmDialog(false);
  };

  const handleEdit = async (index) => {
    setCurrentPatient(await readPatient(index));
    console.log("CurrentPatient: ",currentPatient);
    setEditIndex(index);
    setOpenEditDialog(true);
  };

  const handleEditChange = (event) => {
    setCurrentPatient({ ...currentPatient, [event.target.name]: event.target.value });
  };

  const saveEdit = () => {
    editPatient(editIndex, currentPatient);
    fetchPatients(setPatients);
    setOpenEditDialog(false);
    reset();
  };

  return (
    <List style={{ width: '100%' }}>
      {patients.map((patient,index) => (
        <Paper key={patient.patient_id} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={`ID: ${index + 1} - ${patient.firstname} ${patient.lastname}`} />
            <div>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(patient.patient_id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(patient.patient_id)}>
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
            <Grid item xs={6}><TextField fullWidth label="First Name" name="firstname" value={currentPatient.firstname || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Last Name" name="lastname" value={currentPatient.lastname || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Age" name="age" value={currentPatient.age || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Occupation" name="occupation" value={currentPatient.occupation || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="OLD RX: OD" name="oldrx_od" value={currentPatient.oldrx_od || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="NEW RX: OD" name="newrx_od" value={currentPatient.newrx_od || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="OLD RX: OS" name="oldrx_os" value={currentPatient.oldrx_os || ''} onChange={handleEditChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="NEW RX: OS" name="newrx_os" value={currentPatient.newrx_os || ''} onChange={handleEditChange} /></Grid>
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
