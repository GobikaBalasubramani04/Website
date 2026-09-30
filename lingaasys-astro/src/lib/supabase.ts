import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceRoleKey =
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);