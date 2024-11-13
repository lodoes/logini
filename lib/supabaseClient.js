import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swhmeukjfyweokwodoez.supabase.co';
const supabaseAnonKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3aG1ldWtqZnl3ZW9rd29kb2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MjI2NzksImV4cCI6MjA0Mzk5ODY3OX0.EIk0AInFnzNZ_iP_iwVS3Vn9PyZYUHef72f1PZeSKZ4';


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
