import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔁 Replace these with YOUR values
const SUPABASE_URL = "https://amqswzjlpjueivyhbeex.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jYdYf3IF7dEQmmSHzErJGQ_aPoaeSvT";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);