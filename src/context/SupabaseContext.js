// SupabaseContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/client'; // Your Supabase configuration file

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial session
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  
    // Subscribe to authentication state changes
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
  
    return () => {
      // Unsubscribe from authentication state changes when the component is unmounted
      // subscription?.unsubscribe();
    };
  }, []);
  

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {console.error(error);}
      setUser(user);
    },
    signOut: async () => {
      await supabase.auth.signOut();
      setUser(null);
    },
    readPatients: async (setPatients) => {
      let { data: patients, error } = await supabase.from('patients').select('*');
      setPatients(patients);
      if (error) { console.log(error); } else { console.log("Succesfully retrieved patient records"); }
    },
    readAppointments: async () => {
      let { data: appointments, error } = await supabase.from('appointments').select('*');
      if (error) { console.log(error); } else { console.log("Succesfully retrieved appointment records"); }
    },
    insertPatient: async (patientDetails) => {
      try { 
        const { data, error } = await supabase.from('patients').insert({
          firstname: patientDetails.firstname,
          lastname: patientDetails.lastname,
          age: patientDetails.age,
          occupation: patientDetails.occupation,
          oldrx: patientDetails.oldrx,
          newrx: patientDetails.newrx,
          frame: patientDetails.frame
        }).select();
        if (error) { console.error('Error inserting record:', error.message); } else { console.log('Record inserted successfully:', data); }
      } catch (error) { console.error('Error inserting record:', error.message); }
    },
    deletePatient: async (patient_id) => {
      const { error } = await supabase.from('patients').delete().eq('patient_id', patient_id);
      if (error) { console.log('Error deleting record:', error.message);
      } else { console.log("Succesfully deleted patient_id:", patient_id); }
    },
    editPatient: async (patient_id, patientDetails) => {
      const { data, error } = await supabase.from('patients').update({
        firstname: patientDetails.firstname,
        lastname: patientDetails.lastname,
        age: patientDetails.age,
        occupation: patientDetails.occupation,
        oldrx: patientDetails.oldrx,
        newrx: patientDetails.newrx,
        frame: patientDetails.frame
      }).eq('patient_id', patient_id).select();
      if (error) { console.log('Error updating record:', error.message); } else { console.log("Succesfully updated patient_id:", patient_id); }
    },
    readPatient: async (patient_id) => {
      const { data, error } = await supabase.from('patients').select("*").eq('patient_id', patient_id);
      if (error) { console.log('Error finding record:', error.message); } else { console.log("Succesfully found patient_id:", patient_id); }
      if (data) { return (data[0]); }
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