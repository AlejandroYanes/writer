import { type Editor, type JSONContent } from '@tiptap/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { cn } from '@/ui';
import { investorDeck } from '@/templates/investor-deck';

interface Props {
  editor: Editor;
}

export default function SlidesEditor(props: Props) {
  const { editor } = props;
  const doc = editor.getJSON();

  const [template] = useState(investorDeck);

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
    <section className="py-16 px-8 h-[calc(100vh_-_56px)] overflow-y-auto">
      <main className="flex flex-col gap-10 mx-auto w-10/12">
        {slides.map((slide, index) => (
          <div key={index} className="border border-gray-200 p-4 w-full rounded-md aspect-video">
            {processBlocks(slide)}
          </div>
        ))}
      </main>
    </section>
  );
}

function processBlocks(blocks: JSONContent[], { level }: { level?: number } = { level: 0 }) {
  const elements = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]!;

    if (block.type === 'heading' && block.attrs!.level === 1) {
      elements.push(
        <h1 key={block.id} className="text-4xl mt-8 mb-8 font-bold">
          {block.content!.map((c: JSONContent) => c.text).join('')}
        </h1>
      );
    }

    if (block.type === 'heading' && block.attrs!.level === 2) {
      elements.push(
        <h2 key={block.id} className="text-2xl mt-8 mb-8 font-bold">
          {block.content!.map((c: JSONContent) => c.text).join('')}
        </h2>
      );
    }

    if (block.type === 'heading' && block.attrs!.level === 3) {
      elements.push(
        <h3 key={block.id} className="text-2xl mt-8 mb-8">
          {block.content!.map((c: JSONContent) => c.text).join('')}
        </h3>
      );
    }

    if (block.type === 'paragraph') {
      if (!block.content) {
        elements.push(<br key={block.id}/>);
        continue;
      }

      elements.push(
        <p key={block.id} className={level === 0 ? 'mt-6 mb-3' : undefined}>
          {block.content.map((c: JSONContent) => {
            const styles = resolveTextStyles(c);
            const wrapperNodes = resolveWrapperNodes(c);
            const wrappedContent = wrapperNodes.reduce((node, Wrapper) => {
              return (
                <Wrapper>{node}</Wrapper>
              );
            }, <>{c.text}</>)
            return <span key={Date.now()} style={styles}>{wrappedContent}</span>
          })}
        </p>
      );
    }

    if (block.type === 'imageBlock') {
      const alignment = block.attrs!.align;
      elements.push(
        <Image
          src={block.attrs!.src}
          className={cn(
            'mt-16',
            alignment === 'left' && 'ml-0 mr-auto',
            alignment === 'center' && 'ml-auto mr-auto',
            alignment === 'right' && 'ml-auto mr-0',
          )}
          width={380}
          height={380}
          style={{ width: block.attrs!.width }}
          alt={block.attrs!.alt ?? 'document image'}
        />
      );
    }

    if (block.type === 'bulletList') {
      const bulletItems = [];

      for (const point of block.content!) {
        bulletItems.push(processBlocks(point.content!, { level: (level ?? 0) + 1 }));
      }

      elements.push(
        <ul className="list-disc px-4 flex flex-col gap-1">
          {bulletItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    if (block.type === 'orderedList') {
      const bulletItems = [];

      for (const point of block.content!) {
        bulletItems.push(processBlocks(point.content!, { level: (level ?? 0) + 1 }));
      }

      elements.push(
        <ol className="list-decimal pl-8 pr-4 flex flex-col gap-1">
          {bulletItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>,
      );
    }
  }

  return elements;
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
