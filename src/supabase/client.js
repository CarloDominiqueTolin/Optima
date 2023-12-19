import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qpmhtxlfhcjjpnexewcf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwbWh0eGxmaGNqanBuZXhld2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMjE1OTcsImV4cCI6MjAxNzU5NzU5N30.I_qkkiCUzqA083kpwmR_f0KixMr8cmKO-zm0Z5iwhA0";

export const supabase = createClient(supabaseUrl, supabaseKey);