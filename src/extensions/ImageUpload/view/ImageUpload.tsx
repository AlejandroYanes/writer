import { type Editor, NodeViewWrapper } from '@tiptap/react';
import { useCallback } from 'react';

import { ImageUploader } from './ImageUploader';
import { cn } from '@/ui';

interface Props {
  getPos: () => number;
  editor: Editor;
  minimal?: boolean;
}

export const ImageUpload = ({ getPos, editor, minimal }: Props) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        const { doc, tr } = editor.state;
        const imageBlockType = editor.schema.nodes.imageBlock;
        const imageUploadType = editor.schema.nodes.imageUpload;
        const horizontalRuleType = editor.schema.nodes.horizontalRule;

        const currentImageUploadPos = getPos(); // Get the position of the current `imageUpload`
        let sectionStart = 0;
        let sectionEnd = doc.content.size;

        // Find the section boundaries around the imageUpload
        doc.descendants((node, pos) => {
          if (node.type === horizontalRuleType) {
            if (pos < currentImageUploadPos) {
              sectionStart = pos + node.nodeSize; // Update section start after the last <hr> before upload
            } else if (pos > currentImageUploadPos && sectionEnd === doc.content.size) {
              sectionEnd = pos; // Update section end at the first <hr> after upload
              return false;
            }
          }
        });

        // Search for an existing imageBlock within the section
        let imageBlockExists = false;
        let imageBlockPos: number | undefined = undefined;
        doc.nodesBetween(sectionStart, sectionEnd, (node, pos) => {
          if (node.type === imageBlockType) {
            imageBlockExists = true;
            imageBlockPos = pos;
            return false; // Stop traversal once an imageBlock is found
          }
        });

        // Remove the current imageUpload node if minimal = false
        if (!minimal) {
          const currentNode = doc.nodeAt(currentImageUploadPos);

          if (currentNode?.type === imageUploadType) {
            tr.delete(currentImageUploadPos, currentImageUploadPos + currentNode!.nodeSize);
          }
        }

        // Dispatch the transaction to update the document
        if (tr.docChanged) {
          editor.view.dispatch(tr);
        }

        // Handle `imageBlock` logic
        if (imageBlockExists) {
          // First dispatch for extending the imageBlock with the new src
          editor
            .chain()
            .extendImageBlockAt({ src: url, pos: imageBlockPos! })
            .focus()
            .run();
        } else {
          // First dispatch for setting a new imageBlock if none exists
          editor
            .chain()
            .setImageBlockAt({ src: url, pos: currentImageUploadPos })
            .focus()
            .run();
        }

        // Dispatch the transaction to update the imageBlock
        editor.view.dispatch(editor.state.tr);
      }
    },
    [getPos, editor, minimal],
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
