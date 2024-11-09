import { useEffect, useMemo, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import {
  ArchiveIcon,
  Layers3Icon,
  MoreVerticalIcon,
  PencilLineIcon,
  SaveIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react';
import { type Editor } from '@tiptap/react';
import { Doc as YDoc } from 'yjs';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';
import { api } from '@/trpc/react';
import { BlockEditor } from '@/components/BlockEditor';
import { useBlockEditor } from '@/hooks/useBlockEditor';
import SlidesEditor from '@/components/slides-editor';

interface Props {
  folder: number;
  article: number | null;
}

export default function Content(props: Props) {
  const { folder, article } = props;
  const { data: session } = useSession();

  const [view, setView] = useState<'editor' | 'presentation'>('editor');

  const ydoc = useMemo(() => new YDoc(), []);
  const { editor } = useBlockEditor({
    ydoc,
    article: article,
    user: session?.user.id ?? null,
    className: 'h-[calc(100vh_-_56px)] m-0',
  });

  const { data: content, isLoading } = api.articles.getContent.useQuery({ article: article! }, { enabled: !!article });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const toggleView = () => {
    setView(view === 'editor' ? 'presentation' : 'editor');
  };

  return (
    <div className="flex h-screen flex-col flex-1 relative" data-el="content-writer">
      <TopRow
        editor={editor}
        folder={folder}
        article={article}
        session={session}
        view={view}
        toggleView={toggleView}
      />
      {!!editor && !!article && !isLoading && (
        view === 'editor'
          ? <BlockEditor editor={editor} />
          : <SlidesEditor editor={editor} />
      )}
    </div>
  )
}

interface TopRowProps {
  folder: number;
  article: number | null;
  editor: Editor | null;
  session: Session | null;
  view: 'editor' | 'presentation';
  toggleView: () => void;
}

function TopRow(props: TopRowProps) {
  const { editor, folder, article, session, view, toggleView } = props;

  const utils = api.useUtils();
  const { mutate: updateContent } = api.articles.updateContent.useMutation({
    onSuccess: () => {
      void utils.articles.list.invalidate({ folder });
    },
  });

  const saveContent = async () => {
    if (!editor || !article || !session?.user) return;

    const userId = session.user.id;
    const jsonContent = editor.getJSON();
    const fileName = `article_${article}.json`;
    const filePath = `${userId}/articles/article_${article}/`;
    const contentFile = new File([JSON.stringify(jsonContent)], fileName, { type: 'application/json' });
    const newBlob = await upload(`${filePath}${fileName}`, contentFile, {
      access: 'public',
      handleUploadUrl: `/api/articles/upload/${userId}/${article}`,
    });
    updateContent({ article, content_url: newBlob.url });
  };

  return (
    <div className="flex items-center p-2 gap-1 border-b h-[56px]">
      <div className="rounded-md ml-auto flex flex-row gap-1 items-center overflow-hidden shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleView}
            >
              {view === 'editor' ? <Layers3Icon className="h-5 w-5"/> : <PencilLineIcon className="h-5 w-5"/>}
              <span className="sr-only">
                {view === 'editor' ? 'Edit Slides' : 'Edit content'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {view === 'editor' ? 'Edit Slides' : 'Edit content'}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={saveContent}
            >
              <SaveIcon className="h-5 w-5"/>
              <span className="sr-only">Save</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save</TooltipContent>
        </Tooltip>
      </div>

      <div className="rounded-md flex flex-row gap-1 items-center overflow-hidden shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-4 w-4"/>
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuItem>
              <StarIcon className="h-4 w-4 mr-2"/>
              Mark as starred
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilLineIcon className="h-4 w-4 mr-2"/>
              Edit title
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <ArchiveIcon className="h-4 w-4 mr-2"/>
              Move to archive
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2Icon className="h-4 w-4 mr-2"/>
              Move to trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
