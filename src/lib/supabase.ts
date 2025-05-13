import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://eowhhxooolxmruzxekju.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvd2hoeG9vb2x4bXJ1enhla2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMjEyNjAsImV4cCI6MjA2MjU5NzI2MH0.2SgrdNAFJSpMeT1WfoYa86mRaSDQFtOmVYskj6-_9zw';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };