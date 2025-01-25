import type { Editor } from '@tiptap/react';

interface Params {
  urls: string[];
  editor: Editor;
  pos: number;
  remove?: boolean;
}

export function uploadImagesToEditor(params: Params) {
  const { urls, editor, pos, remove } = params;
  const { doc, tr } = editor.state;
  const imageBlockType = editor.schema.nodes.imageBlock;
  const imageUploadType = editor.schema.nodes.imageUpload;
  const horizontalRuleType = editor.schema.nodes.horizontalRule;

  const currentImageUploadPos = pos; // Get the position of the current `imageUpload`
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
  if (remove) {
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
      .extendImagesBlockAt({ src: urls, pos: imageBlockPos! })
      .focus()
      .run();
  } else {
    // First dispatch for setting a new imageBlock if none exists
    editor
      .chain()
      .setImagesBlockAt({ src: urls, pos: currentImageUploadPos })
      .focus()
      .run();
  }

  // Dispatch the transaction to update the imageBlock
  editor.view.dispatch(editor.state.tr);
}
