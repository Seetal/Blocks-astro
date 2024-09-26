import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const leaderboard = sqliteTable('leaderboard', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  score: integer('score').notNull(),
  date: text('date').notNull(),
});

export const topten = sqliteTable('topten', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  score: integer('score').notNull(),
  date: text('date').notNull(),
});

export type InsertScore = typeof leaderboard.$inferInsert;
export type SelectScore = typeof leaderboard.$inferSelect;