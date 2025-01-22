import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { type Node } from '@tiptap/pm/model';
import { type Editor, NodeViewWrapper } from '@tiptap/react';

interface ImageBlockViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string>) => void;
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
  const { editor, getPos, node } = props as ImageBlockViewProps & {
    node: Node & {
      attrs: {
        src: string;
      };
    };
  }
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { src } = node.attrs;

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos())
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div className="w-20">
        <div contentEditable={false} ref={imageWrapperRef}>
          <Image width={80} height={80} className="block rounded-lg" src={src} alt="" onClick={onClick} />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default ImageBlockView
