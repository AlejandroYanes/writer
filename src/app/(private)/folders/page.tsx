import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

import { getServerAuthSession } from '@/server/auth';
import FoldersList from './__components/folders-list';

export default async function FoldersPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect('/');
  }

  const { user } = session;
  const foldersQ = await sql<{ id: number; name: string }>`SELECT id, name FROM folders WHERE user_id = ${user.id}`;

  return <FoldersList folders={foldersQ.rows} />;
}
