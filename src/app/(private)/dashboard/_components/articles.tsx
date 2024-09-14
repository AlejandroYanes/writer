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
    <div className="border-r w-1/4 shrink-0 flex flex-col h-[100vh] overflow-y-auto">
      <div className="h-[56px] min-h-[56px] px-4 py-2 sticky top-0 bg-white border-b">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search" className="pl-8"/>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-stretch gap-2 p-2">
        {articles.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              'h-auto shrink-0 w-full flex flex-col items-start gap-2 transition-all hover:bg-accent',
              'rounded-lg border p-3 text-left text-sm',
              'overflow-hidden',
              selected === item.id && 'border-rose-500',
            )}
            onClick={() => onSelected(item.id)}
          >
            <span className="font-semibold w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.title}
            </span>
            {/*<span className="text-xs text-muted-foreground">*/}
            {/*  Now: {(new Date()).toLocaleString()}*/}
            {/*</span>*/}
            {/*<span className="text-xs text-muted-foreground">*/}
            {/*  Last edit: {item.updated_at.toLocaleString()}*/}
            {/*</span>*/}
            <span className="text-xs text-muted-foreground">
              Last edit: {formatDistanceToNow(new Date(item.updated_at), { addSuffix: true, includeSeconds: true })}
            </span>
          </Button>
        ))}
      </div>
      <div className="sticky bottom-0 bg-white py-2 mt-auto border-t px-2 h-[56px]">
        {folder > 0 ? <AddArticle folder={folder} onSuccess={onSelected}/> : null}
      </div>
    </div>
  );
}

function AddArticle(props: { folder: number; onSuccess: (article: number) => void }) {
  const { folder, onSuccess } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setShowModal(true)}>
        <PencilLineIcon className="h-4 w-4 mr-2"/>
        <span>Start article</span>
      </Button>
      {showModal && <AddArticleModal folder={folder} onClose={() => setShowModal(false)} onSuccess={onSuccess}/>}
    </>
  );
}

const schema = z.object({
  name: z.string().min(1, 'Please provide a name'),
});

type Input = z.infer<typeof schema>;

function AddArticleModal(props: { folder: number; onClose: () => void; onSuccess: (article: number) => void }) {
  const { folder, onClose, onSuccess } = props;

  const form = useForm<Input>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const utils = api.useUtils();

  const { mutate: createArticle, isPending, error } = api.articles.create.useMutation({
    onSuccess: (response) => {
      void utils.articles.list.invalidate({ folder });
      onSuccess(response);
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

