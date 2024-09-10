import * as React from 'react';
import { PencilLineIcon, Search, Trash2Icon } from 'lucide-react';

import { Button, Input, Separator, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import type { Mail } from '../data';
import { DocList } from './doc-list';

interface Props {
  mails: Mail[];
  selected: string | null;
  onSelected: (mailId: string) => void;
}

export default function DocLists(props: Props) {
  const { mails, selected, onSelected } = props;
  return (
    <div className="border-r w-1/4 shrink-0">
      <div className="flex items-center justify-end px-4 py-2 h-[56px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <PencilLineIcon className="h-4 w-4" />
              <span className="sr-only">Start new article</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Start new article</TooltipContent>
        </Tooltip>
      </div>
      <Separator/>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search" className="pl-8"/>
          </div>
        </form>
      </div>
      <DocList items={mails} selected={selected} onSelected={onSelected}/>
    </div>
  );
}
