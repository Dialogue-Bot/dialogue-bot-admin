import '@/styles/rich-editor.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Braces,
  Code,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Minus,
  Strikethrough,
  TextQuote,
  UnderlineIcon,
} from 'lucide-react'
import { Separator } from '.'
import { Toggle } from './toggle'

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export const RichEditor = ({ onChange, value }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ListItem,
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      let content = editor.getHTML()
      const json = editor.getJSON().content

      if (
        Array.isArray(json) &&
        json.length === 1 &&
        !Object.prototype.hasOwnProperty.call(json[0], 'content')
      ) {
        content = ''
      }

      onChange?.(content)
    },
  })

  return (
    <div className='rounded-md border-input border focus-within:outline-none focus-within:ring-1 focus-within:ring-ring shadow-sm'>
      <div className='flex gap-2 flex-wrap p-2 border-b '>
        <Toggle
          size='sm'
          variant='outline'
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          defaultPressed={editor?.isActive('bold')}
          pressed={editor?.isActive('bold')}
          title='Bold'
        >
          <Bold className='w-4 h-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          defaultPressed={editor?.isActive('italic')}
          pressed={editor?.isActive('italic')}
          title='Italic'
        >
          <Italic className='w-4 h-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={!editor?.can().chain().focus().toggleUnderline().run()}
          defaultPressed={editor?.isActive('')}
          pressed={editor?.isActive('underline')}
          title='Underline'
        >
          <UnderlineIcon className='w-4 h-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          defaultPressed={editor?.isActive('strike')}
          pressed={editor?.isActive('strike')}
          title='Strikethrough'
        >
          <Strikethrough className='w-4 h-4' />
        </Toggle>
        <Separator
          orientation='vertical'
          className='items-stretch self-stretch'
        />
        <Toggle
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          size='sm'
          variant='outline'
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          defaultPressed={editor?.isActive('heading', { level: 2 })}
          pressed={editor?.isActive('heading', { level: 2 })}
          title='Heading 2'
        >
          <Heading2 className='w-4 h-4' />
        </Toggle>
        <Toggle
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          size='sm'
          variant='outline'
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          defaultPressed={editor?.isActive('heading', { level: 3 })}
          pressed={editor?.isActive('heading', { level: 3 })}
          title='Heading 3'
        >
          <Heading3 className='w-4 h-4' />
        </Toggle>
        <Toggle
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }
          size='sm'
          variant='outline'
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 4 }).run()
          }
          defaultPressed={editor?.isActive('heading', { level: 4 })}
          pressed={editor?.isActive('heading', { level: 4 })}
          title='Heading 4'
        >
          <Heading4 className='w-4 h-4' />
        </Toggle>
        <Separator
          orientation='vertical'
          className='items-stretch self-stretch'
        />
        <Toggle
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          size='sm'
          variant='outline'
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          defaultPressed={editor?.isActive('bulletList')}
          pressed={editor?.isActive('bulletList')}
          title='Bullet list'
        >
          <List className='w-4 h-4' />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          size='sm'
          variant='outline'
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          defaultPressed={editor?.isActive('orderedList')}
          pressed={editor?.isActive('orderedList')}
          title='Ordered list'
        >
          <ListOrdered className='w-4 h-4' />
        </Toggle>
        <Separator
          orientation='vertical'
          className='items-stretch self-stretch'
        />
        <Toggle
          size='sm'
          variant='outline'
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={!editor?.can().chain().focus().toggleCode().run()}
          defaultPressed={editor?.isActive('code')}
          pressed={editor?.isActive('code')}
          title='Code'
        >
          <Code className='w-4 h-4' />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          size='sm'
          variant='outline'
          disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
          defaultPressed={editor?.isActive('codeBlock')}
          pressed={editor?.isActive('codeBlock')}
          title='Code block'
        >
          <Braces className='w-4 h-4' />
        </Toggle>
        <Separator
          orientation='vertical'
          className='items-stretch self-stretch'
        />
        <Toggle
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          size='sm'
          variant='outline'
          disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
          defaultPressed={editor?.isActive('blockquote')}
          pressed={editor?.isActive('blockquote')}
          title='Blockquote'
        >
          <TextQuote className='w-4 h-4' />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          size='sm'
          variant='outline'
          title='Horizontal rule'
        >
          <Minus className='w-4 h-4' />
        </Toggle>
        <Separator
          orientation='vertical'
          className='items-stretch self-stretch'
        />
        <Toggle
          onPressedChange={(pressed) => {
            if (pressed) {
              editor?.chain().focus().setTextAlign('left').run()
            } else {
              editor?.chain().focus().unsetTextAlign().run()
            }
          }}
          size='sm'
          variant='outline'
          title='Text align'
          defaultPressed={editor?.isActive({ textAlign: 'left' })}
          pressed={editor?.isActive({ textAlign: 'left' })}
        >
          <AlignLeft className='w-4 h-4' />
        </Toggle>
        <Toggle
          onPressedChange={(pressed) => {
            if (pressed) {
              editor?.chain().focus().setTextAlign('center').run()
            } else {
              editor?.chain().focus().unsetTextAlign().run()
            }
          }}
          defaultPressed={editor?.isActive({ textAlign: 'center' })}
          pressed={editor?.isActive({ textAlign: 'center' })}
          size='sm'
          variant='outline'
          title='Text align'
        >
          <AlignCenter className='w-4 h-4' />
        </Toggle>
        <Toggle
          onPressedChange={(pressed) => {
            if (pressed) {
              editor?.chain().focus().setTextAlign('right').run()
            } else {
              editor?.chain().focus().unsetTextAlign().run()
            }
          }}
          size='sm'
          variant='outline'
          title='Text align'
          defaultPressed={editor?.isActive({ textAlign: 'right' })}
          pressed={editor?.isActive({ textAlign: 'right' })}
        >
          <AlignRight className='w-4 h-4' />
        </Toggle>
        <Toggle
          onPressedChange={(pressed) => {
            if (pressed) {
              editor?.chain().focus().setTextAlign('justify').run()
            } else {
              editor?.chain().focus().unsetTextAlign().run()
            }
          }}
          size='sm'
          variant='outline'
          title='Text align'
          defaultPressed={editor?.isActive({ textAlign: 'justify' })}
          pressed={editor?.isActive({ textAlign: 'justify' })}
        >
          <AlignJustify className='w-4 h-4' />
        </Toggle>
      </div>
      <EditorContent
        editor={editor}
        className='min-h-20 overflow-y-auto max-h-20 prose max-w-full'
      />
    </div>
  )
}

export default RichEditor
