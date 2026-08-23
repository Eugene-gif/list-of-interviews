import type { PostgrestError } from '@supabase/supabase-js';

interface InterviewApp {
	id?: string;
	user_id: string;
	title: string;
	created_at?: string;
	completed: boolean;
}

export type {
	PostgrestError,
	InterviewApp
}