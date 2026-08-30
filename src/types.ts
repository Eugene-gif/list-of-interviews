import type { PostgrestError } from '@supabase/supabase-js';

interface InterviewApp {
  id?: string;
  user_id?: string;
  created_at?: string;
  company: string;
  vacancy_link: string;
  hr_name: string;
  contact_email?: string;
  contact_telegram?: string;
  contact_whatsapp?: string;
  contact_phone?: string;
  salary_to?: number;
  salary_from?: number;
  stages: StageApp[];
  status?: 'Pending' | 'Offer' | 'Refusal';
}

interface StageApp {
  id: string;
  name: string;
  date: Date | null;
  description: string;
}

interface StageDB {
  id: string;
  name: string;
  date: string | null;
  description: string;
}

export type {
  PostgrestError,
  InterviewApp,
  StageDB,
  StageApp
}
