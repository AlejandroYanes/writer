import { Node, ReactNodeViewRenderer } from '@tiptap/react';
import { type Range } from '@tiptap/core'

import { ImageBlockView } from './components/ImageBlockView'

declare module '@tiptap/core' {
  // noinspection JSUnusedGlobalSymbols
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlockAt: (attributes: { src: string; pos: number | Range }) => ReturnType;
      extendImageBlockAt: (attributes: { src: string; pos: number }) => ReturnType;
    };
  }
}

export const ImageBlock = Node.create({
  name: 'imageBlock',
  group: 'block',
  defining: true,
  isolating: true,
  draggable: false,
  addAttributes() {
    return {
      images: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-type': this.name }, 0];
  },

  addCommands() {
    return {
      setImageBlockAt: (attrs) => {
        return ({ commands }) => {
          return commands.insertContentAt(attrs.pos, { type: 'imageBlock', attrs: { images: [attrs.src] } });
        };
      },
      extendImageBlockAt: (attrs) => {
        return ({ state, dispatch }) => {
          const { tr, doc } = state;
          const type = state.schema.nodes.imageBlock; // Use the correct node type

          if (!type) {
            console.error('Node type "imageBlock" not found in schema.');
            return false;
          }

          let found = false;

          // Iterate through the document to find the first node of type `imageBlock`
          doc.descendants((node, pos) => {
            if (node.type === type && pos === attrs.pos) {
              found = true;
              const existingImages = node.attrs.images || [];
              const updatedImages = [...existingImages, attrs.src];

              // Update the node's attributes with the new images array
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                images: updatedImages,
              });

              return false; // Stop further traversal once we find the node
            }
            return true;
          });

          if (found && dispatch) {
            dispatch(tr);
            return true;
          }

          console.warn('No node of type "imageBlock" found in the document.');
          return false; // No node of the given type found
        };
      },

    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView)
  },
})

export default ImageBlock
