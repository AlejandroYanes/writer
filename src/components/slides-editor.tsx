import { type Editor, type JSONContent } from '@tiptap/react';

interface Props {
  editor: Editor;
}

export default function SlidesEditor(props: Props) {
  const { editor } = props;
  const doc = editor.getJSON();
  const content = doc.content ?? [];

  const slides = [];
  let temp = [];

  for (const item of content) {
    if (item.type === 'horizontalRule') {
      slides.push(temp);
      temp = [];
    } else {
      temp.push(item);
    }
  }

  return (
    <section className="py-16 px-8 flex flex-col gap-10 h-[calc(100vh_-_56px)] overflow-y-auto">
      {slides.map((slide, index) => (
        <div key={index} className="border border-gray-200 p-4 rounded-md">{processBlocks(slide)}</div>
      ))}
    </section>
  );
}

function processBlocks(blocks: JSONContent[]) {
  const elements = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]!;

    if (block.type === 'heading' && block.attrs!.level === 1) {
      elements.push(
        <h1 key={block.id} className="text-4xl mt-8 mb-8">
          {block.content!.map((c: JSONContent) => c.text).join('')}
        </h1>
      );
    }

    if (block.type === 'heading' && block.attrs!.level === 2) {
      elements.push(
        <h2 key={block.id} className="text-3xl mt-8 mb-8">
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
      if (block.content!.length === 0) {
        elements.push(<br key={block.id}/>);
        continue;
      }

      elements.push(
        <p key={block.id} className="mb-2">
          {block.content!.map((c: JSONContent) => c.text).join('')}
        </p>
      );
    }
  }

  return elements;
}
