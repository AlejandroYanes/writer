'use server'

import { put, del } from '@vercel/blob';

import { getServerAuthSession } from '@/server/auth';

export async function uploadFile(formData: FormData) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const orgId = session.user.organisation_id;

  const file = formData.get('right_to_work') as File;
  const path = formData.get('path') as string;

  const blob = await put(`org_${orgId}/${path}/${file.name}`, file, {
    access: 'public',
  });

  return blob.url;
}

export async function deleteFile(fileURL: string) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  await del(fileURL);
  return true;
}
