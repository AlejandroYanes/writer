import * as React from 'react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { PencilLineIcon, Search } from 'lucide-react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/trpc/react';
import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  InputWithLabel,
  Loader,
  ScrollArea,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';

interface Props {
  folder: number;
  selected: number | null;
  onSelected: (article: number) => void;
}

export default function Articles(props: Props) {
  const { folder, selected, onSelected } = props;

  const { data: articles = [] } = api.articles.list.useQuery({ folder });

  return (
    <div className="border-r w-1/4 shrink-0">
      <div className="flex items-center justify-end px-4 py-2 h-[56px]">
        {folder > 0 ? <AddArticle folder={folder} /> : null}
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
      <ScrollArea className="h-[calc(100vh_-_128px)]">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {articles.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                'h-auto flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                selected === item.id && 'border-rose-500',
              )}
              onClick={() => onSelected(item.id)}
            >
              <span className="font-semibold">{item.title}</span>
              <span className="text-xs text-muted-foreground">
                Last edit: {formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function AddArticle(props: { folder: number }) {
  const { folder } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setShowModal(true)}>
            <PencilLineIcon className="h-4 w-4"/>
            <span className="sr-only">Start new article</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Start new article</TooltipContent>
      </Tooltip>
      {showModal && <AddArticleModal folder={folder} onClose={() => setShowModal(false)} />}
    </>
  );
}

const schema = z.object({
  name: z.string().min(1, 'Please provide a name'),
});

type Input = z.infer<typeof schema>;

function AddArticleModal(props: { folder: number; onClose: () => void }) {
  const { folder, onClose } = props;

  const form = useForm<Input>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const utils = api.useUtils();

  const { mutate: createArticle, isPending, error } = api.articles.create.useMutation({
    onSuccess: () => {
      void utils.articles.list.invalidate({ folder });
      onClose();
    },
  });
  const errorMessage = error?.message;

  const handleSubmit = form.handleSubmit((data) => {
    createArticle({ ...data, folder });
  })

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <InputWithLabel
                  required
                  label="Name"
                  error={form.formState.errors.name?.message}
                  {...field}
                />
              )}
            />
            {errorMessage ? (
              <span className="text-sm text-red-500">{errorMessage}</span>
            ) : null}
          </div>
          <DialogFooter>
            <Button className="px-6" disabled={isPending}>
              {isPending && (
                <Loader color="white" size="xs" className="mr-2"/>
              )}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

