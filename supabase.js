import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


const supabase_url = "https://fyzkoualaabdlnisxidl.supabase.co"
const publishable_key = "sb_publishable_5AlMtB9W4N9fLqV3BTibSw_1C2RPUkE"

const supabase = createClient(supabase_url, publishable_key)

export default supabase