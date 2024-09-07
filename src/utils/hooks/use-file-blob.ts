'use client';

import { useEffect, useState } from 'react';
import type { HeadBlobResult } from '@vercel/blob';
import { useQuery } from '@tanstack/react-query';

import { deleteFile, uploadFile } from './server-actions';

export type Folder = 'right_to_work' | 'passport_copy' | 'avatars';

interface Params {
  folder: Folder;
  fileURL: string | null;
}

interface FileInfo {
  file: File | null;
  uploadURL: string | null;
  changed: boolean;
}

export default function useFileBlob(params: Params) {
  const { folder, fileURL } = params;

  const [info, setInfo] = useState<FileInfo>({
    file: null,
    uploadURL: null,
    changed: false,
  });

  const { data: blob, isLoading } = useQuery({
    queryKey: ['file_info', folder, fileURL],
    queryFn: async () => {
      const response = await fetch('/api/blob/head?url=' + encodeURIComponent(fileURL!));

      if (!response.ok) {
        throw new Error('Failed to fetch file info');
      }

      const data: HeadBlobResult = await response.json();
      return data;
    },
    retry: 0,
    enabled: !!fileURL,
  });

  useEffect(() => {
    if (blob) {
      const name = resolveFileName(blob);
      setInfo({
        file: new File([], name, { type: blob.contentType }),
        uploadURL: blob.url,
        changed: false,
      });
    }
  }, [blob]);

  const handleChange = (file: File | null) => {
    setInfo((prev) => ({
      file,
      changed: true,
      name: file ? file.name : null,
      uploadURL: file ? prev.uploadURL : null,
    }));
  }

  const setUploadURL = (uploadURL: string | null) => {
    setInfo((prev) => ({
      ...prev,
      uploadURL,
    }));
  }

  const handleFileUpload = async () => {
    const { file, uploadURL, changed } = info;
    if (!changed) return uploadURL;

    let fileURL = uploadURL;

    // file was removed or replaced - delete the old file
    if (uploadURL) {
      await deleteFile(uploadURL);
      setInfo((prev) => ({ ...prev, uploadURL: null }));
      fileURL = null;
    }

    if (file) {
      const formData = new FormData();
      formData.append('right_to_work', file);
      formData.append('path', folder);

      fileURL = await uploadFile(formData);

      setInfo((prev) => ({ ...prev, uploadURL: fileURL }));
    }

    return fileURL;
  }

  return {
    ...info,
    isLoading,
    handleChange,
    setUploadURL,
    handleFileUpload,
  };
}

function resolveFileName(fileInfo: HeadBlobResult) {
  return fileInfo.pathname.split('/').pop() ?? '';
}
