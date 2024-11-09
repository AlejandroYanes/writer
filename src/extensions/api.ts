import { upload } from '@vercel/blob/client';

const API = {
  uploadImage: async (file: File) => {
    const editorNode = document.querySelector('div.tiptap[data-article]');

    if (!editorNode) {
      return '';
    }

    const user = (editorNode as HTMLElement).dataset.user;
    const __article = (editorNode as HTMLElement).dataset.article;

    if (!user || !__article) {
      return '';
    }

    const article = Number(__article);

    const filePath = `${user}/articles/article_${article}/`;
    const newBlob = await upload(`${filePath}${file.name}`, file, {
      access: 'public',
      handleUploadUrl: `/api/articles/upload/images/${article}`,
    });
    return newBlob.url;
  }
}

export default API
