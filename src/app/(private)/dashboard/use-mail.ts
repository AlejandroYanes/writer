import { useState } from 'react';

import { type Mail, mails } from './data';

type Config = {
  selected: Mail['id'] | null;
}
export function useMail() {
  return useState<Config>({ selected: mails[0]!.id });
}
