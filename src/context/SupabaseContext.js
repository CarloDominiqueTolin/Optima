// SupabaseContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/client'; 

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin, setLoginStatus] = useState(false);


  const addTransaction = async (transactionType) => {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // HH:MM:SS
    const { error } = await supabase.from('transactions').insert([{
          patient_id: null,
          transaction_date: currentDate,
          transaction_time: currentTime,
          transaction_type: transactionType,
        }]);
    if (error) { 
      console.log('Error adding transaction:', error.message); 
    } else { 
      console.log("Succesfully added transaction"); 
    }
  };


  const value = {
    user,
    isLoggedin,

    signIn: async (email, password, changeRoute) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setUser(null); 
        console.error(error);
        alert("Login failed! Try again.");
      } else {
        setUser(data.session);
        setLoginStatus(true);
        changeRoute('/dashboard');
        addTransaction('Logged in');
      }
    },


    signOut: async () => {
      await supabase.auth.signOut();
      setUser(null); 
      addTransaction('Logged out');
      alert('Logged out');
      setLoginStatus(false);
    },
    

    fetchTransactions: async (setTransactions) => {
      let { data: transactions, error } = await supabase.from('transactions').select('*');
      setTransactions(transactions);
      if (error) { 
        alert('Fetching transactions failed!');
        console.log(error); 
      } else { 
        console.log("Succesfully fetched transactions"); 
      }
    },


    fetchPatients: async (setPatients) => {
      let { data: patients, error } = await supabase.from('patients').select('*');
      setPatients(patients);
      if (error) { 
        alert('Reading patients failed!');
        console.log(error); 
      } else { 
        console.log("Succesfully retrieved patient records"); 
      }
    },


    readPatient: async (patient_id) => {
      const { data, error } = await supabase.from('patients').select("*").eq('patient_id', patient_id);
      if (error) { 
        console.log('Error finding record:', error.message); 
      } else { 
        console.log("Succesfully found patient_id:", patient_id); 
      }
      if (data) { return (data[0]); }
    },


    insertPatient: async (patientDetails) => {
      try { 
        const { data, error } = await supabase.from('patients').insert(patientDetails).select();
        if (error) { 
          alert('Adding patient failed!');
          console.error('Error inserting record:', error.message); 
        } else { 
          console.log('Record inserted successfully:', data); 
          alert("Succesfully created new patient!");
          addTransaction("Added Patient: "+patientDetails.lastname+","+patientDetails.firstname);
        }
      } catch (error) { 
        alert('Adding patient failed!');
        console.error('Error inserting record:', error.message); 
      }
    },

    
    deletePatient: async (patient_id) => {
      const { error } = await supabase.from('patients').delete().eq('patient_id', patient_id);
      if (error) { 
        alert('Deleting patient failed!');
        console.log('Error deleting record:', error.message);
      } else { 
        alert("Succesfully deleted patient!");
        console.log("Succesfully deleted patient_id:", patient_id); 
        addTransaction("Deleted Patient: "+patient_id);
      }
    },


    editPatient: async (patient_id, patientDetails) => {
      const { error } = await supabase.from('patients').update(patientDetails).eq('patient_id', patient_id).select();
      if (error) { 
        console.log('Error updating record:', error.message); 
      } else { 
        alert("Succesfully updated patient!");
        console.log("Succesfully updated patient_id:", patient_id); 
        addTransaction("Edited Patient: "+patient_id);
      }
    },


    

    readAppointments: async () => {
      let { error } = await supabase.from('appointments').select('*');
      if (error) { 
        alert('Reading appointments failed!');
        console.log(error); 
      } else { 
        console.log("Succesfully retrieved appointment records"); 
      }
    },
  };


  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};