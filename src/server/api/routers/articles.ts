import { z } from 'zod';
import { sql } from '@vercel/postgres';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const articlesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({
      folder: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const foldersQ = await sql<{ id: number; title: string; created_at: Date; updated_at: Date }>`
      SELECT id, title, created_at, updated_at
      FROM articles
      WHERE folder_id = ${input.folder} AND user_id = ${userId}
      ORDER BY created_at`;

      return foldersQ.rows;
    }),

  create: protectedProcedure.input(z.object({
    name: z.string().min(1, 'Please provide a name'),
    folder: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    await sql`INSERT INTO articles (title, folder_id, user_id) VALUES (${input.name}, ${input.folder}, ${userId})`;
    return true;
  }),
});
