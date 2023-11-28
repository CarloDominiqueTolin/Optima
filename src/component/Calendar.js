import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Dialog, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, setEvents }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddAppointment = () => {
    const newEvent = {
      title: `${firstName} ${lastName}`,
      start: selectedDate,
      end: selectedDate,
    };
    const currentEvents = Array.isArray(events) ? events : [];

    setEvents([...currentEvents, newEvent]);
  handleClose();
  };

  

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        onSelectSlot={handleSelectSlot}
        selectable
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        views={['month', 'agenda']}
        style={{ backgroundColor: '#5a96ca', color: 'white', margin: 40, borderRadius: 5 }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAppointment}>Add Appointment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
