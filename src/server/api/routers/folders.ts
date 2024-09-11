import { z } from 'zod';
import { sql } from '@vercel/postgres';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const foldersRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const foldersQ = await sql<{ id: number; name: string }>`
      SELECT id, name FROM folders WHERE user_id = ${userId}`;

    return foldersQ.rows;
  }),

  create: protectedProcedure.input(z.object({
    name: z.string().min(1, 'Please provide a name'),
  })).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    await sql`INSERT INTO folders (name, user_id) VALUES (${input.name}, ${userId})`;
    return true;
  }),
});
