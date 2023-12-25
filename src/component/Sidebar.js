import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';
import TransactionHistoryDialog from './Transaction';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 230;

const Sidebar = ({ appointments, transactions, onCameraOpen, onListPatients, onSettingsClick, onDeleteAppointment, }) => {
  const  [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  const onHistoryClick = () => {setHistoryDialogOpen(true)  };
  const handleCloseHistoryDialog = () => {setHistoryDialogOpen(false)};

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1167b1',
          color: 'powderblue',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h5" sx={{ my: 2, mx: 1, color: 'powderblue' }}> OPTIMA </Typography>
      <List>
        <Typography variant="h7" sx={{ my: 0, mx: 2, color: 'powderblue' }}> MANAGE PATIENTS </Typography>
        <hr />
        <ListItem key={0} onClick={onCameraOpen}> <ListItemText primary="New Patient" secondary="Create new patient profile" /> </ListItem>
        <ListItem key={1} onClick={onListPatients}> <ListItemText primary="List Patient" secondary="Show all patient records" /> </ListItem>

        <br />
        <Typography variant="h7" sx={{ my: 0, mx: 2, color: 'powderblue' }}> OTHER ACTIONS </Typography>
        <hr />
        <ListItem key={2} onClick={onHistoryClick}> <ListItemText primary="Show History" secondary="List all action history" /> </ListItem>
        <ListItem key={3} onClick={onSettingsClick}> <ListItemText primary="Settings" secondary="Other admin options" /> </ListItem>
        
        <br />
        <Typography variant="h7" sx={{ my: 0, mx: 2, color: 'powderblue' }}> Today's Appointments </Typography>
        <hr />
        {appointments.map((appointment, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteAppointment(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={appointment.title}
              secondary={moment(appointment.start).format('MMM Do YYYY')}
            />
          </ListItem>
        ))}
      </List>

      <TransactionHistoryDialog open={historyDialogOpen} onClose={handleCloseHistoryDialog} transactionHistory={transactions}/>
    </Drawer>
  );
};

export default Sidebar;
