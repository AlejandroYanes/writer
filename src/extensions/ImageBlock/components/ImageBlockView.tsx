import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { type Node } from '@tiptap/pm/model';
import { type Editor, NodeViewWrapper } from '@tiptap/react';

import { ImageUpload } from '@/extensions/ImageUpload/view';

interface Props {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string>) => void;
}

export const ImageBlockView = (props: Props) => {
  const { editor, getPos, node } = props as Props & {
    node: Node & {
      attrs: {
        images: string[];
      };
    };
  }
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { images } = node.attrs;

  return (
    <NodeViewWrapper>
      <div className="grid grid-cols-6 gap-6">
        {images.map((src, index) => (
          <div className="w-20" key={index}>
            <div contentEditable={false} ref={imageWrapperRef}>
              <Image width={80} height={80} className="block rounded-lg" src={src} alt="" />
            </div>
          </div>
        ))}
        <ImageUpload getPos={getPos} editor={editor} minimal />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageBlockView
