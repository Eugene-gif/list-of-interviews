import type { PostgrestError } from '@supabase/supabase-js';

interface InterviewApp {
  id?: string;
  user_id?: string;
  created_at?: string;
  company: string;
  vacancy_link: string;
  hr_name: string;
  contact_email?:string;
  contact_telegram?: string;
  contact_whatsapp?: string;
  contact_phone?: string;
}

export type {
	PostgrestError,
	InterviewApp,
}
