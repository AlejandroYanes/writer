'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { FileTextIcon } from 'lucide-react';

import { api } from '@/trpc/react';
import { Skeleton, Table, TableBody, TableCell, TableRow } from '@/ui';

interface Props {
  params: {
    folder: string;
  };
}

export default function ArticlesPage(props: Props) {
  const { folder } = props.params;
  const { data: articles = [], isLoading } = api.articles.list.useQuery({ folder: Number(folder) });

  return (
    <div className="flex flex-col gap-10 pt-10 max-w-2xl mx-auto">
      <h1 className="text-3xl">Articles</h1>
      <Table>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Link href={`/folders/${folder}/articles/${article.id}`}>
                  <div className="flex gap-2">
                    <FileTextIcon className="h-5 w-5 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span>{article.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(article.updated_at), { addSuffix: true, includeSeconds: true })}
                      </span>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          ))}
          {isLoading ? (
            <>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-10"/>
                </TableCell>
              </TableRow>
            </>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
