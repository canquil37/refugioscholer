import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kdiebhgdnhbcyomezsob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaWViaGdkbmhiY3lvbWV6c29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjk2NjAsImV4cCI6MjA3NTk0NTY2MH0.Jfs74adWQtz8LRRlR5FDVA8zSs3p8_i1xJvIrFtWDdY';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
