import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';
import ClientProviders from '@/components/client-providers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <ClientProviders session={session}>
      {children}
    </ClientProviders>
  );
}
