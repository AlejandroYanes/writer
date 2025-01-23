import { type ChangeEvent, useCallback } from 'react';

import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/ui/button';
import { Icon } from '@/components/ui/Icon';
import { useDropZone, useFileUpload, useUploader } from './hooks';

interface Props {
  minimal?: boolean;
  onUpload: (url: string) => void;
}

export const ImageUploader = ({ onUpload, minimal }: Props) => {
  const { loading, uploadFile } = useUploader({ onUpload })
  const { handleUploadClick, ref } = useFileUpload()
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile })

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile(e.target.files[0]!) : null),
    [uploadFile],
  )

  if (loading) {
    return (
      <div
        className={cn(
          'flex items-center justify-center p-8',
          'rounded-lg bg-opacity-80 border border-dashed border-gray-300',
          { 'min-h-[10rem] h-56': !minimal, 'h-full': minimal },
        )}
      >
        <Spinner className="text-neutral-500" size={1.5} />
      </div>
    )
  }

  const wrapperClass = cn(
    'flex flex-col items-center justify-center rounded-lg bg-opacity-80 border border-dashed border-gray-300',
    draggedInside && 'bg-neutral-100',
    {
      'px-8 py-10 h-56': !minimal,
      'h-full': minimal,
    },
  )

  return (
    <div
      className={wrapperClass}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      {minimal ? (
        <Button variant="undecorated" className="p-0 h-auto w-auto" onClick={handleUploadClick}>
          <Icon name="Image" className={cn('w-12 h-12 text-black dark:text-white opacity-20')} />
        </Button>
      ) : (
        <>
          <Icon name="Image" className={cn('w-12 h-12 text-black dark:text-white opacity-20 mb-4')} />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
              {draggedInside ? 'Drop image here' : 'Drag and drop or'}
            </div>
            <div>
              <Button variant="black" size="sm" disabled={draggedInside} onClick={handleUploadClick}>
                <Icon name="Upload" className="mr-1" />
                Upload an image
              </Button>
            </div>
          </div>
        </>
      )}
      <input
        className="w-0 h-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  )
}

export default ImageUploader
