import { useUploadSingle } from '@/hooks/upload/use-upload-single'
import { cn } from '@/lib/utils'
import { Loader2, Plus, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { AspectRatio } from '.'
import { Button } from './button'

type Props = {
  value?: string
  onChange?: (value: string) => void
  toServer?: boolean
  defaultValue?: string
  size?: number
  disabled?: boolean
}

const InputImage = ({
  onChange,
  value,
  toServer,
  defaultValue,
  size,
  disabled,
}: Props) => {
  const [image, setImage] = useState<string>(defaultValue || '')
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadSingleMutation = useUploadSingle()

  const isControlled = value !== undefined

  const _value = isControlled ? value : image

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!toServer) {
      const reader = new FileReader()
      reader.onload = () => {
        if (!isControlled) {
          console.log(reader.result as string)
          setImage(reader.result as string)
        }
        onChange?.(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      uploadSingleMutation.mutate(file, {
        onSuccess: (data) => {
          if (!isControlled) {
            setImage(data.data)
          }
          onChange?.(data.data)
        },
      })
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div
      className={cn({
        'pointer-events-none': disabled,
      })}
    >
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
        ref={inputRef}
      />
      {_value ? (
        <div className='relative w-40' style={{ width: size, height: size }}>
          <Button
            disabled={disabled}
            variant='destructive'
            className='right-2 top-2 absolute z-10 p-0 w-7 h-7'
            onClick={() => {
              if (!isControlled) {
                setImage('')
              }
              onChange?.('')
            }}
            type='button'
          >
            <X className='w-4 h-4' />
          </Button>
          <AspectRatio ratio={1}>
            <img
              src={_value}
              alt='image'
              className='object-cover w-full h-full rounded-md'
            />
          </AspectRatio>
        </div>
      ) : (
        <div
          className='relative rounded-md w-40 h-40 '
          style={{ width: size, height: size }}
        >
          {uploadSingleMutation.isPending && (
            <div className='absolute top-0 right-0 left-0 bg-white backdrop-blur-sm  z-10 w-full h-full flex items-center justify-center'>
              <Loader2 className='w-6 h-6 text-black animate-spin' />
            </div>
          )}
          <Button
            className='rounded-md h-full w-full'
            variant='outline'
            onClick={() => {
              inputRef.current?.click()
            }}
            type='button'
          >
            <Plus size={24} />
          </Button>
        </div>
      )}
    </div>
  )
}

export default InputImage
