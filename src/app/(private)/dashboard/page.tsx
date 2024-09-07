import { cookies } from 'next/headers';
import Image from 'next/image';

import { Mail } from './_components/mail';
import { accounts, mails } from './data';

export default function MailPage() {
  return (
    <Mail accounts={accounts} mails={mails}/>
  )
}
