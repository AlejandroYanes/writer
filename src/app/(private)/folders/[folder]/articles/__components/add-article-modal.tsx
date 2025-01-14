'use client';

import { useState } from 'react';
import { PlusSquareIcon } from 'lucide-react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputWithLabel,
} from '@/ui';
import { api } from '@/trpc/react';

interface Props {
  folder: number;
}

const schema = z.object({
  name: z.string().min(1, 'Please enter a name for the article'),
});

export default function AddArticleModal(props: Props) {
  const { folder } = props;
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const utils = api.useUtils();
  const { mutate: createArticle } = api.articles.create.useMutation({
    onSuccess: () => {
      void utils.articles.list.invalidate();
      form.reset();
      setOpen(false);
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    createArticle({ ...data, folder });
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="link">
          <PlusSquareIcon className="h-4 w-4 mr-1" />
          Add article
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96" onSubmit={handleSubmit}>
        <form className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Create new article</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputWithLabel label="Name" {...field} error={fieldState.error?.message} />
              )}
            />
          </div>
          <DialogFooter>
            <Button>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
