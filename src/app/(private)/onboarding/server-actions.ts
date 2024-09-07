'use server';

import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

import { getServerAuthSession } from '@/server/auth';

export default async function onboard(formData: FormData) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  const userId = session.user.id;
  const name = formData.get('name');

  if (!name) {
    redirect(`/onboarding?error=empty_name`);
  }

  if (typeof name !== 'string') {
    redirect(`/onboarding?error=incorrect_name`);
  }

  await sql`UPDATE users SET name = ${name} WHERE id = ${userId}`;
  redirect('/dashboard');
}
