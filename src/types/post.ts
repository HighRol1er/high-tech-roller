import { Post } from '@/db/schema/post';
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요').max(100, '제목은 100자 이하로 입력하세요').trim(),
  content: z.string().min(1),
  slug: z.string().min(1),
  tags: z.array(z.string().min(1)).optional(),
});

export type NewPost = z.infer<typeof postSchema>;

export type PostSummary = Omit<Post, 'content' | 'updated_at'>;
