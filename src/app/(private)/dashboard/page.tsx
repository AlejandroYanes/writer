import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

import { getServerAuthSession } from '@/server/auth';
import Dashboard from './_components/dashboard';

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect('/');
  }

  const initialQ = await sql<{ folder_id: number; article_id: number }>`
    SELECT folders.id as folder_id, articles.id as article_id
    FROM folders
      JOIN articles ON articles.folder_id = articles.id
    WHERE folders.user_id = ${session.user.id}`;

  const response = initialQ.rows[0]!;

  return <Dashboard folder={response.folder_id} article={response.article_id} />;
}
