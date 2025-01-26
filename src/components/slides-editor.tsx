import { useMemo, useState } from 'react';
import { type Editor, type JSONContent } from '@tiptap/react';
import Image from 'next/image';

import { cn } from '@/ui';
import { type BlockElement, type SlideTemplate, type Template, type TemplateSectorElement } from '@/templates/types';
import { investorDeck } from '@/templates/investor-deck';

interface Props {
  editor: Editor;
}

export default function SlidesEditor(props: Props) {
  const { editor } = props;
  const doc = editor.getJSON();

  const [template] = useState<Template>(investorDeck);

  const slides = useMemo(() => {
    const content = doc.content ?? [];
    const __slides = [];
    let temp = [];

    for (const item of content) {
      if (item.type === 'horizontalRule') {
        __slides.push(temp);
        temp = [];
      } else {
        temp.push(item);
      }
    }
    __slides.push(temp);
    return __slides;
  }, [doc.content]);

  return (
    <section className="py-16 px-8 xl:px-0 h-[calc(100vh_-_56px)] overflow-y-auto">
      <main className="flex flex-col gap-10 mx-auto w-10/12 max-w-7xl">
        {/*{slides.map((slide, index) => (*/}
        {/*  <div key={index} className="border border-gray-200 p-4 w-full rounded-md aspect-video">*/}
        {/*    {processBlocks(slide, { template })}*/}
        {/*  </div>*/}
        {/*))}*/}
        <div className="border border-gray-200 w-full rounded-md aspect-video overflow-hidden">
          {processBlocks(slides[0]!, { template: template.slides[0]! })}
        </div>
        <div className="border border-gray-200 w-full rounded-md aspect-video overflow-hidden">
          {processBlocks(slides[1]!, { template: template.slides[1]! })}
        </div>
      </main>
    </section>
  );
}

interface ProcessOptions {
  template?: SlideTemplate;
}

function processBlocks(blocks: JSONContent[], options: ProcessOptions) {
  const { template } = options;

  if (template) {
    return parseBlocksToTemplate(blocks, template);
  }

  return parseBlocksToPlainContent(blocks);
}

function parseBlocksToPlainContent(blocks: JSONContent[]) {
  const elements = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]!;

    if (resolveBlockComparison('h1')(block)) {
      elements.push(processH1(block));
    }

    if (resolveBlockComparison('h2')(block)) {
      elements.push(processH2(block));
    }

    if (resolveBlockComparison('h3')(block)) {
      elements.push(processH3(block));
    }

    if (resolveBlockComparison('paragraph')(block)) {
      elements.push(processParagraph(block))
    }

    if (resolveBlockComparison('image')(block)) {
      elements.push(processImages(block));
    }

    if (resolveBlockComparison('bullet_list')(block)) {
      elements.push(processBulletList(block));
    }

    if (resolveBlockComparison('ordered_list')(block)) {
      elements.push(processOrderedList(block));
    }
  }

  return elements;
}

function parseBlocksToTemplate(blocks: JSONContent[], template: SlideTemplate) {
  const sectorBlocks = template.sectors.map((sector, index) => {
    const { elements, alignment, colSpan, rowSpan, className, style } = sector;

    const content = elements.map((el) => {
      const __block = blocks.find((b) => resolveBlockComparison(el.tag)(b));

      if (__block) {
        return processBlockByElement(__block, el);
      }
      return null;
    });

    return (
      <div
        key={index}
        data-align={alignment}
        data-colspan={colSpan}
        data-rowspan={rowSpan}
        className={
          cn(
            'flex flex-col gap-6 h-full',
            'data-[align=left]:items-start data-[align=center]:items-center data-[align=right]:items-end',
            'data-[colspan=true]:col-span-2 data-[rowspan=true]:row-span-2',
            className,
          )
        }
        style={style}
      >
        {content}
      </div>
    );
  });

  return (
    <div className={cn('grid grid-cols-2 grid-rows-2 gap-6 h-full', template.className)}>
      {sectorBlocks}
    </div>
  );
}

function resolveBlockComparison(element: BlockElement) {
  switch (element) {
    case 'h1':
      return (block: JSONContent) => block.type === 'heading' && block.attrs!.level === 1;
    case 'h2':
      return (block: JSONContent) => block.type === 'heading' && block.attrs!.level === 2;
    case 'h3':
      return (block: JSONContent) => block.type === 'heading' && block.attrs!.level === 3;
    case 'paragraph':
      return (block: JSONContent) => block.type === 'paragraph';
    case 'image':
      return (block: JSONContent) => block.type === 'imageBlock';
    case 'bullet_list':
      return (block: JSONContent) => block.type === 'bulletList';
    case 'ordered_list':
      return (block: JSONContent) => block.type === 'orderedList';
    default:
      return () => false;
  }
}

function processBlockByElement(block: JSONContent, element: TemplateSectorElement) {
  switch (element.tag) {
    case 'h1':
      return processH1(block, element);
    case 'h2':
      return processH2(block, element);
    case 'h3':
      return processH3(block, element);
    case 'paragraph':
      return processParagraph(block, element);
    case 'image':
      return processImages(block, element);
    case 'bullet_list':
      return processBulletList(block, element);
    case 'ordered_list':
      return processOrderedList(block, element);
    default:
      return null;
  }
}

type BlockProperties = Omit<TemplateSectorElement, 'tag'>;

function processH1(node: JSONContent, options: BlockProperties = {}) {
  return (
    <h1 key={node.id} className={cn('text-4xl font-bold', options.className)} style={options.style}>
      {node.content!.map((c: JSONContent) => c.text).join('')}
    </h1>
  );
}

function processH2(node: JSONContent, options: BlockProperties = {}) {
  return (
    <h2 key={node.id} className={cn('text-2xl font-bold', options.className)} style={options.style}>
      {node.content!.map((c: JSONContent) => c.text).join('')}
    </h2>
  );
}

function processH3(node: JSONContent, options: BlockProperties = {}) {
  return (
    <h3 key={node.id} className={cn('text-xl', options.className)} style={options.style}>
      {node.content!.map((c: JSONContent) => c.text).join('')}
    </h3>
  );
}

function processParagraph(node: JSONContent, options: BlockProperties = {}) {
  if (!node.content) {
    return <br key={node.id}/>;
  } else {
    return (
      <p key={node.id} className={options.className} style={options.style}>
        {node.content.map((c: JSONContent) => {
          const styles = resolveTextStyles(c);
          const wrapperNodes = resolveWrapperNodes(c);
          const wrappedContent = wrapperNodes.reduce((node, Wrapper) => {
            return (
              <Wrapper>{node}</Wrapper>
            );
          }, <>{c.text}</>);
          return <span key={Date.now()} style={styles}>{wrappedContent}</span>;
        })}
      </p>
    );
  }
}

function processImages(node: JSONContent, options: BlockProperties = {}) {
  let __images: string[] = [];

  if (options.count) {
    if (options.offset) {
      const end = Math.min(options.count + options.offset, node.attrs!.images.length);
      __images = node.attrs!.images.slice(options.offset, end);
    } else {
      __images = node.attrs!.images.slice(options.offset, options.count);
    }
  }

  if (!__images.length) return null;

  const imageNodes = __images.map((image: string, index: number) => (
    <div key={index} className="relative overflow-hidden">
      <Image
        src={image}
        width={380}
        height={380}
        style={{ ...(options.style ?? {}) }}
        alt={node.attrs!.alt ?? 'document image'}
        className="max-h-full h-full w-full max-w-full absolute top-0 right-0 bottom-0 left-0 object-cover"
      />
    </div>
  ));

  return (
    <div className={cn('h-full w-full max-h-full max-w-full', options.className)}>
      {imageNodes}
    </div>
  );
}

function processBulletList(node: JSONContent, options: BlockProperties = {}) {
  const bulletItems = [];

  for (const point of node.content!) {
    bulletItems.push(processParagraph(point.content!));
  }

  return (
    <ul className={cn('list-disc px-4 flex flex-col gap-1', options.className)} style={options.style}>
      {bulletItems.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function processOrderedList(node: JSONContent, options: BlockProperties = {}) {
  const bulletItems = [];

  for (const point of node.content!) {
    bulletItems.push(parseBlocksToPlainContent(point.content!));
  }

  return (
    <ol className={cn('list-decimal pl-8 pr-4 flex flex-col gap-1', options.className)} style={options.style}>
      {bulletItems.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

function resolveWrapperNodes(node: JSONContent) {
  const marks = node.marks;

  if (!marks) return [({ children }: any) => <>{children}</>];

  const nodes: any[] = [];

  marks.forEach((mark) => {
    if (mark.type === 'bold') {
      nodes.push(({ children }: any) => <strong>{children}</strong>);
    }
    if (mark.type === 'italic') {
      nodes.push(({ children }: any) => <em>{children}</em>);
    }
    if (mark.type === 'underline') {
      nodes.push(({ children }: any) => <u>{children}</u>);
    }
    if (mark.type === 'strike') {
      nodes.push(({ children }: any) => <s>{children}</s>);
    }
  });

  return nodes;
}

function resolveTextStyles(node: JSONContent) {
  const marks = node.marks;

  if (!marks) return {};

  const styles: Record<string, string> = {};

  marks.forEach((mark) => {
    if (mark.type === 'textStyle') {
      if (mark.attrs!.color) {
        styles.color = mark.attrs!.color;
      }
      if (mark.attrs!.fontSize) {
        styles.fontSize = mark.attrs!.fontSize;
      }
      if (mark.attrs!.fontFamily) {
        styles.fontFamily = mark.attrs!.fontFamily;
      }
    }

    if (mark.type === 'highlight') {
      styles.backgroundColor = mark.attrs!.color;
    }
  });

  return styles;
}
