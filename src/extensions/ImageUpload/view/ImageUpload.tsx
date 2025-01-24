import { type Editor, NodeViewWrapper } from '@tiptap/react';
import { useCallback } from 'react';

import { ImageUploader } from './ImageUploader';
import { cn } from '@/ui';

interface Props {
  getPos: () => number;
  editor: Editor;
  minimal?: boolean;
}

export const ImageUpload = ({ editor, minimal }: Props) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        const { doc, tr } = editor.state;
        const imageBlockType = editor.schema.nodes.imageBlock;
        const imageUploadType = editor.schema.nodes.imageUpload;

        let imageBlockExists = false;

        // Check if any `imageBlock` nodes exist in the document
        doc.descendants((node) => {
          if (node.type === imageBlockType) {
            imageBlockExists = true;
            return false; // Stop traversal once a match is found
          }
          return true;
        });

        // Remove the last `imageUpload` node if `minimal` is false
        if (!minimal) {
          let lastImageUploadPos: number | null = null;

          // Track the position of the last `imageUpload` node
          doc.descendants((node, pos) => {
            if (node.type === imageUploadType) {
              lastImageUploadPos = pos; // Store the last `imageUpload` position
            }
          });

          if (lastImageUploadPos !== null) {
            const lastNode = doc.nodeAt(lastImageUploadPos);
            if (lastNode) {
              // Replace the `imageUpload` node with an empty node (effectively deletes it)
              tr.delete(lastImageUploadPos, (lastImageUploadPos as number) + lastNode.nodeSize);
            }
          }

          // Dispatch the transaction to remove the imageUpload node
          if (tr.docChanged) {
            editor.view.dispatch(tr);
          }
        }

        // Handle `imageBlock` logic
        if (imageBlockExists) {
          // First dispatch for extending the imageBlock with the new src
          editor
            .chain()
            .extendImageBlock({ src: url })
            .focus()
            .run();
        } else {
          // First dispatch for setting a new imageBlock if none exists
          editor
            .chain()
            .setImageBlock({ src: url })
            .focus()
            .run();
        }

        // Dispatch the transaction to update the imageBlock
        editor.view.dispatch(editor.state.tr);

      }
    },
    [editor, minimal],
  );

  return (
    <NodeViewWrapper>
      <div className={cn('p-0 m-0', { 'h-full': minimal })} data-drag-handle={!minimal}>
        <ImageUploader onUpload={onUpload} minimal={minimal} />
      </div>
    </NodeViewWrapper>
  );
};

export default ImageUpload;
