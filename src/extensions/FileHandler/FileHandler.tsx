import { FileHandler as TiptapFileHandler } from '@tiptap-pro/extension-file-handler';

import API from '@/extensions/api';
import { uploadImagesToEditor } from '@/extensions/ImageUpload/helpers/upload-images-to-editor';

export const FileHandler = TiptapFileHandler.configure({
  allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  onDrop: (currentEditor, files, pos) => {
    void Promise.allSettled(files.map(API.uploadImage))
      .then((results) => {
        const urls = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);

        if (urls.length) {
          uploadImagesToEditor({ urls, pos, editor: currentEditor });
        }
      });
  },
  onPaste: (currentEditor, files) => {
    void Promise.allSettled(files.map(API.uploadImage))
      .then((results) => {
        const urls = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);

        if (urls.length) {
          uploadImagesToEditor({
            urls,
            editor: currentEditor,
            pos: currentEditor.state.selection.anchor,
          });
        }
      });
  },
});
