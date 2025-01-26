// import { upload } from '@vercel/blob/client';

const API = {
  uploadImage: async (file: File) => {
    const url = await convertBase64(file);
    return url as string;
    // TODO: uncomment further on to upload images to the blob network instead of hardcoding them as base64
    // const editorNode = document.querySelector('div.tiptap[data-article]');
    //
    // if (!editorNode) {
    //   return '';
    // }
    //
    // const user = (editorNode as HTMLElement).dataset.user;
    // const __article = (editorNode as HTMLElement).dataset.article;
    //
    // if (!user || !__article) {
    //   return '';
    // }
    //
    // const article = Number(__article);
    //
    // const filePath = `${user}/articles/article_${article}/`;
    // const newBlob = await upload(`${filePath}${file.name}`, file, {
    //   access: 'public',
    //   handleUploadUrl: `/api/articles/upload/images/${article}`,
    // });
    // return newBlob.url;
  }
}

const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default API
