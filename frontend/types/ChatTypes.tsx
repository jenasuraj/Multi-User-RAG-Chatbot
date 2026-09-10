export interface ChatHistory {
  user: string;
  bot: string;
  status: string;
}

export interface ChatThread {
  id: number;
  thread_id: string;
  status: string;
  user_id: number;
}
