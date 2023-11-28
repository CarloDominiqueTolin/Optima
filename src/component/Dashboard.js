import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MyCalendar from './Calendar';
import PatientList from './PatientList';
import {
  Box,
  CssBaseline,
  Dialog,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Grid,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [patientDetails, setPatientDetails] = useState({ firstName: '', lastName: '', age: '', occupation: '', oldRx: '', newRx: '', frame: '' });
  const webcamRef = React.useRef(null);
  const [showPatients, setShowPatients] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [openLogoutConfirmation, setOpenLogoutConfirmation] = useState(false);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAppointmentIndex, setDeleteAppointmentIndex] = useState(null);


  const handleDeleteConfirmation = (index) => {
    setDeleteAppointmentIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteAppointment = () => {
    if (deleteAppointmentIndex !== null) {
      setEvents(events.filter((_, index) => index !== deleteAppointmentIndex));
    }
    setDeleteDialogOpen(false);
    setDeleteAppointmentIndex(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleOpenCamera = () => {
    setOpenCamera(true);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setOpenCamera(false);
    setOpenVerification(true);
  };

  const handleVerificationClose = () => {
    setOpenVerification(false);
  };

  const handleChange = (event) => {
    setPatientDetails({ ...patientDetails, [event.target.name]: event.target.value });
  };

  const handleSavePatient = () => {
    setPatients([...patients, { ...patientDetails, image: capturedImage }]);
    setOpenVerification(false);
    setPatientDetails({ firstName: '', lastName: '', age: '', occupation: '', oldRx: '', newRx: '', frame: '' });
  };

  const toggleShowPatients = () => {
    setShowPatients(!showPatients);
  };

  const handleLogout = () => {
    setOpenLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutConfirmation(false);
    navigate('/');
    // Perform logout actions here
  };

  const handleCloseLogoutConfirmation = () => {
    setOpenLogoutConfirmation(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        appointments={events}
        onCameraOpen={handleOpenCamera}
        onListPatients={toggleShowPatients}
        onSettingsClick={handleSettingsClick}
        onDeleteAppointment={handleDeleteConfirmation}

      />
      {showPatients ? (
        <PatientList patients={patients} setPatients={setPatients} />
      ) : showSettings ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', // Add this line
            height: '100%', // Add this line to fill the available height
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <MyCalendar events={events} setEvents={setEvents} />
      )}
      
      <Dialog
      open={deleteDialogOpen}
      onClose={handleCloseDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this appointment?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteAppointment} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>

      <Dialog open={openCamera} onClose={() => setOpenCamera(false)}>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <Button onClick={handleCapture}>Capture</Button>
      </Dialog>

      <Dialog open={openVerification} onClose={handleVerificationClose} maxWidth="md" fullWidth>
        <DialogContent>
          {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: '100%', marginBottom: '20px' }} />}
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField fullWidth label="First Name" name="firstName" value={patientDetails.firstName} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Last Name" name="lastName" value={patientDetails.lastName} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Age" name="age" value={patientDetails.age} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Occupation" name="occupation" value={patientDetails.occupation} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="OLD RX: OD" name="oldRx" value={patientDetails.oldRx} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="NEW RX: OD" name="newRx" value={patientDetails.newRx} onChange={handleChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Frame" name="frame" value={patientDetails.frame} onChange={handleChange} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerificationClose}>Close</Button>
          <Button onClick={handleSavePatient}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLogoutConfirmation} onClose={handleCloseLogoutConfirmation}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;