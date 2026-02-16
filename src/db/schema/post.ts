import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  tags: text('tags').array().notNull().default([]),
  slug: varchar('slug', { length: 255 }).unique().notNull(), // URL 주소로 쓰일 이름
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
