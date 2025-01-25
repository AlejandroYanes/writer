import { type Editor, NodeViewWrapper } from '@tiptap/react';
import { useCallback } from 'react';

import { ImageUploader } from './ImageUploader';
import { cn } from '@/ui';
import { uploadImagesToEditor } from '@/extensions/ImageUpload/helpers/upload-images-to-editor';

interface Props {
  getPos: () => number;
  editor: Editor;
  minimal?: boolean;
}

export const ImageUpload = ({ getPos, editor, minimal }: Props) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        uploadImagesToEditor({ urls: [url], editor, pos: getPos(), remove: !minimal });
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
