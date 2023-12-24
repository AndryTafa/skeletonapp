// todo this is in client side, so it's not safe to put the key here
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlafrzvsvwgbovwbuyyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYWZyenZzdndnYm92d2J1eXliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzM1ODMxNiwiZXhwIjoyMDE4OTM0MzE2fQ.1kpBIfOSDGEy_RR-NsfIEToxwYcih4gu8K-dHdyT1S4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
