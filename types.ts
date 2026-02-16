export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  content: string; // The prompt text
  timestamp: number;
}

export type ViewMode = 'USER' | 'ADMIN';