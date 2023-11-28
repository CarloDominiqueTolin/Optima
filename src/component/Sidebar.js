import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';
import TransactionHistoryDialog from './Transaction'; // Make sure to adjust the import path as needed
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 230;

const Sidebar = ({ appointments, onCameraOpen, onListPatients, onSettingsClick, onDeleteAppointment }) => {
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  
  const menuItems = [
    { text: 'Manage Patient Records' },
    { text: 'Create Patient', action: onCameraOpen },
    { text: 'List Patients', action: onListPatients },
    { text: 'Settings', action: onSettingsClick },
  ];

  const handleMenuItemClick = (action) => {
    if (action) {
      action();
    }
  };

  const handleHistoryClick = () => {
    // Display the history dialog and populate the transaction history data
    setHistoryDialogOpen(true);

    // In a real application, you would fetch or calculate the transaction history data here
    const newTransactionHistory = [
      { action: 'Added a patient', timestamp: moment().format('MMM Do YYYY, h:mm a') },
      // Add more transaction history entries as needed
    ];

    setTransactionHistory(newTransactionHistory);
  };

  const handleCloseHistoryDialog = () => {
    // Close the history dialog
    setHistoryDialogOpen(false);
  };

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
      <Typography variant="h6" sx={{ my: 2, mx: 1, color: 'powderblue' }}>
        OPTIMA
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleMenuItemClick(item.action)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleHistoryClick}>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Appointments" />
        </ListItem>
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
      <TransactionHistoryDialog
        open={historyDialogOpen}
        onClose={handleCloseHistoryDialog}
        transactionHistory={transactionHistory}
      />
    </Drawer>
  );
};

export default Sidebar;
