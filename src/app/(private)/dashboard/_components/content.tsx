import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon, ArchiveIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ItalicIcon,
  LayoutListIcon,
  ListIcon,
  ListOrderedIcon, MoreVerticalIcon, StarIcon,
  StrikethroughIcon, Trash2Icon,
  TypeIcon,
} from 'lucide-react';
import StarterKit from '@tiptap/starter-kit';
// import Document from '@tiptap/extension-document';
// import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';

import {
  Button,
  cn,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';

// const CustomDocument = Document.extend({
//   content: 'heading heading block*',
// })

const extensions = [
  StarterKit,
  // StarterKit.configure({ document: false }),
  // CustomDocument,
  // Placeholder.configure({
  //   showOnlyCurrent: false,
  //   placeholder: ({ node }) => {
  //     if (node.type.name === 'heading' && node.attrs.level == 1) {
  //       return 'What’s the title?'
  //     }
  //
  //     if (node.type.name === 'heading' && node.attrs.level == 3) {
  //       return 'What’s the subtitle?'
  //     }
  //
  //     return 'Write something...';
  //   },
  // }),
  Highlight,
  Typography,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TaskList,
  TaskItem,
];

// const content =  `
//     <h1>
//       Markdown shortcuts
//     </h1>
//     <h3>Markdown shortcuts make it easy to format the text while typing.</h3>
//     <p>
//       Markdown shortcuts make it easy to format the text while typing.
//     </p>
//     <p>
//       To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
//     </p>
//     <p>
//       Those conventions are called input rules in Tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
//     </p>
//     <p>
//       You can overwrite existing input rules or add your own to nodes, marks and extensions.
//     </p>
//     <p>
//       For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
//     </p>
//     <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Diam etiam libero bibendum viverra class proin iaculis nam. Mauris massa fames molestie pharetra justo phasellus amet massa scelerisque. Netus dignissim lobortis lacus efficitur, fringilla neque at elit. Laoreet aliquet tellus euismod ullamcorper rutrum pretium enim maximus. Auctor quisque ante pharetra velit interdum, hac inceptos curae. Viverra nulla facilisis pharetra sodales taciti suspendisse suspendisse. Dolor volutpat eros eget cras orci blandit. Viverra in blandit at per egestas.</p>
//     <p>Litora bibendum primis; semper sem volutpat eget fusce. Mauris ut nam senectus aenean montes dictumst placerat nisi. Nibh nunc aliquet nec netus auctor ex taciti. Primis dictum parturient maximus laoreet imperdiet tortor hac. Nulla curae vel lectus lectus quis, per proin torquent. Eu lacus erat posuere id velit varius senectus aliquam ridiculus. Ridiculus felis sollicitudin lorem habitasse senectus etiam consequat purus porttitor. Molestie dictumst venenatis litora hendrerit dignissim praesent est. Nisl mi vel risus primis maximus ipsum.</p>
//     <p>Vehicula per taciti est iaculis, tincidunt mus luctus. Tempor tortor fames consectetur rutrum parturient. Curabitur quis eu class porta morbi quisque fames. Cubilia hac nunc nascetur, congue himenaeos eget etiam in. Ipsum lorem nostra luctus suspendisse nullam condimentum ut. Luctus nisl a porttitor faucibus laoreet. Faucibus id sapien sollicitudin tempor pharetra magnis a luctus vulputate. Phasellus pharetra pulvinar velit quis nascetur in nulla molestie penatibus. Nisi porta sollicitudin taciti hendrerit porta interdum placerat justo? Hendrerit in ornare justo netus in interdum luctus ante.</p>
//     <p>Ultrices dictum pretium feugiat; senectus pretium felis. Arcu vestibulum venenatis molestie interdum torquent sagittis posuere nisi. Bibendum vestibulum praesent etiam dictumst, amet porta feugiat. Facilisi ornare a arcu aenean mollis duis interdum. Facilisis massa dignissim hendrerit maecenas taciti. Luctus convallis eu penatibus ante nibh, quis blandit. Accumsan felis iaculis; blandit morbi habitant a efficitur condimentum. Venenatis maximus aptent nostra neque ante augue penatibus arcu nec. Ac penatibus a tempor eros pellentesque justo a montes litora.</p>
//     <p>Commodo montes curae curae facilisi in erat penatibus. Viverra vulputate aliquet iaculis massa turpis quam ex. Tincidunt nam ut sapien nec curae curae. Phasellus sed fringilla nostra magna odio libero netus tincidunt. Mi iaculis enim ligula id hendrerit elementum convallis. Cras montes fringilla libero quis porta aenean quisque nibh varius. Mauris senectus accumsan mollis integer conubia dis. Accumsan duis hendrerit placerat eros tellus quisque non nulla. Tellus odio primis non conubia, maximus phasellus mus.</p>
//     `;

const content = ``;

export default function Content() {
  const editor = useEditor({
    extensions,
    content,
    editorProps: { attributes: { class: 'h-[calc(100vh_-_56px)] mx-auto' } },
    immediatelyRender: false,
  });

  return (
    <div className="flex h-screen flex-col flex-1">
      <div className="flex items-center p-2 gap-1">
        <div className="rounded-md flex flex-row gap-1 items-center overflow-hidden shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 1 }) ? 'border' : '')}
              >
                <Heading1Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Heading level 1
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 2 }) ? 'border' : '')}
              >
                <Heading2Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Heading level 2
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 3 }) ? 'border' : '')}
              >
                <Heading3Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Heading level 3
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
                className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 4 }) ? 'border' : '')}
              >
                <Heading4Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Heading level 4
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().setParagraph().run()}
                className={cn('w-10 shrink-0', editor?.isActive('paragraph') ? 'border' : '')}
              >
                <TypeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Text
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6"/>

        <div className="rounded-md flex flex-row gap-1 items-center overflow-hidden shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={editor?.isActive('bold') ? 'border' : ''}
              >
                <BoldIcon className="h-4 w-4"/>
                <span className="sr-only">Bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={editor?.isActive('italic') ? 'border' : ''}
              >
                <ItalicIcon className="h-4 w-4"/>
                <span className="sr-only">Italic</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                className={editor?.isActive('strike') ? 'border' : ''}
              >
                <StrikethroughIcon className="h-4 w-4"/>
                <span className="sr-only">Strikethrough</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6"/>

        <div className="rounded-md flex flex-row gap-1 items-center overflow-hidden shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                className={editor?.isActive({ textAlign: 'left' }) ? 'border' : ''}
              >
                <AlignLeftIcon className="h-4 w-4"/>
                <span className="sr-only">Align left</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align left</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                className={editor?.isActive({ textAlign: 'center' }) ? 'border' : ''}
              >
                <AlignCenterIcon className="h-4 w-4"/>
                <span className="sr-only">Align center</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align center</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                className={editor?.isActive({ textAlign: 'right' }) ? 'border' : ''}
              >
                <AlignRightIcon className="h-4 w-4"/>
                <span className="sr-only">Align right</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                className={editor?.isActive({ textAlign: 'justify' }) ? 'border' : ''}
              >
                <AlignJustifyIcon className="h-4 w-4"/>
                <span className="sr-only">Align justify</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align justify</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6"/>

        <div className="rounded-md flex flex-row gap-1 items-center overflow-hidden shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={editor?.isActive('bulletList') ? 'border' : ''}
              >
                <ListIcon className="h-5 w-5"/>
                <span className="sr-only">Bullet list</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet list</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={editor?.isActive('orderedList') ? 'border' : ''}
              >
                <ListOrderedIcon className="h-5 w-5"/>
                <span className="sr-only">Number list</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Number list</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor?.chain().focus().toggleTaskList().run()}
                className={editor?.isActive('taskList') ? 'border' : ''}
              >
                <LayoutListIcon className="h-5 w-5"/>
                <span className="sr-only">Task list</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Task list</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mr-2 ml-auto h-6"/>

        <div className="rounded-md flex flex-row gap-1 items-center overflow-hidden shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVerticalIcon className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-52">
              <DropdownMenuItem>
                <StarIcon className="h-4 w-4 mr-2"/>
                Mark as starred
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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

      <Separator/>

      <EditorContent editor={editor} />
    </div>
  )
}

// TODO: code for the bubble menu in the future
// {editor && (
//   <BubbleMenu
//     className="p-1 flex flex-row items-center gap-1 bg-white border rounded shadow-sm overflow-x-auto max-w-lg"
//     tippyOptions={{ duration: 100 }}
//     editor={editor}
//   >
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//       className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 1 }) ? 'border' : '')}
//     >
//       <Heading1Icon className="h-5 w-5" />
//     </Button>
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//       className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 2 }) ? 'border' : '')}
//     >
//       <Heading2Icon className="h-5 w-5" />
//     </Button>
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//       className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 3 }) ? 'border' : '')}
//     >
//       <Heading3Icon className="h-5 w-5" />
//     </Button>
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//       className={cn('w-10 shrink-0', editor?.isActive('heading', { level: 4 }) ? 'border' : '')}
//     >
//       <Heading4Icon className="h-5 w-5" />
//     </Button>
//
//     <Separator orientation="vertical" className="mx-2 h-6"/>
//
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleBold().run()}
//       className={cn('w-10 shrink-0', editor?.isActive('bold') ? 'border' : '')}
//     >
//       <BoldIcon className="h-4 w-4" />
//     </Button>
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleItalic().run()}
//       className={cn('w-10 shrink-0', editor?.isActive('italic') ? 'border' : '')}
//     >
//       <ItalicIcon className="h-4 w-4" />
//     </Button>
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => editor.chain().focus().toggleStrike().run()}
//       className={cn('w-10 shrink-0', editor?.isActive('strike') ? 'border' : '')}
//     >
//       <StrikethroughIcon className="h-4 w-4" />
//     </Button>
//
//     <Separator orientation="vertical" className="mx-2 h-6"/>
//
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => editor?.chain().focus().setTextAlign('left').run()}
//           className={cn('w-10 shrink-0', editor?.isActive({ textAlign: 'left' }) ? 'border' : '')}
//         >
//           <AlignLeftIcon className="h-4 w-4"/>
//           <span className="sr-only">Align left</span>
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent>Align left</TooltipContent>
//     </Tooltip>
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => editor?.chain().focus().setTextAlign('center').run()}
//           className={cn('w-10 shrink-0', editor?.isActive({ textAlign: 'center' }) ? 'border' : '')}
//         >
//           <AlignCenterIcon className="h-4 w-4"/>
//           <span className="sr-only">Align center</span>
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent>Align center</TooltipContent>
//     </Tooltip>
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => editor?.chain().focus().setTextAlign('right').run()}
//           className={cn('w-10 shrink-0', editor?.isActive({ textAlign: 'right' }) ? 'border' : '')}
//         >
//           <AlignRightIcon className="h-4 w-4"/>
//           <span className="sr-only">Align right</span>
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent>Align right</TooltipContent>
//     </Tooltip>
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
//           className={cn('w-10 shrink-0', editor?.isActive({ textAlign: 'justify' }) ? 'border' : '')}
//         >
//           <AlignJustifyIcon className="h-4 w-4"/>
//           <span className="sr-only">Align justify</span>
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent>Align justify</TooltipContent>
//     </Tooltip>
//   </BubbleMenu>
// )}
