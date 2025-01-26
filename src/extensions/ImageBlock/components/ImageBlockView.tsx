import { useRef } from 'react';
import Image from 'next/image';
import { type Node } from '@tiptap/pm/model';
import { type Editor, NodeViewWrapper } from '@tiptap/react';
import { Trash2Icon } from 'lucide-react';

import { ImageUpload } from '@/extensions/ImageUpload/view';
import { Button } from '@/ui';

interface Props {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string | string[]>) => void;
}

export const ImageBlockView = (props: Props) => {
  const { editor, getPos, node, updateAttributes } = props as Props & {
    node: Node & {
      attrs: {
        images: string[];
      };
    };
  }
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { images } = node.attrs;

  const removeImage = (target: string) => {
    const __images = images.filter(image => image !== target);

    if (__images.length === 0) {
      editor.chain().setNodeSelection(getPos()).deleteSelection().run();
    } else {
      updateAttributes({ images: __images });
    }
  };

  return (
    <NodeViewWrapper>
      <div className="grid grid-cols-6 gap-6">
        {images.map((src, index) => (
          <div className="w-20" key={index}>
            <div className="relative group" contentEditable={false} ref={imageWrapperRef}>
              <Image width={80} height={80} className="block rounded-lg" src={src} alt="" />
              <div className="absolute top-0 w-full h-full flex items-center justify-center bg-neutral-50/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="black" size="icon" onClick={() => removeImage(src)}>
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <ImageUpload getPos={getPos} editor={editor} minimal />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageBlockView
