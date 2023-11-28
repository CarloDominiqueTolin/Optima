import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';

const TransactionHistoryDialog = ({ open, onClose, transactionHistory }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Transaction History</DialogTitle>
      <DialogContent>
        <List>
          {transactionHistory.map((transaction, index) => (
            <ListItem key={index}>
              <ListItemText primary={transaction.action} secondary={transaction.timestamp} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionHistoryDialog;
