import React from 'react'
import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer'
import { cn } from '@/app/[lang]/utils/cn'

export default function RichTextBlockRenderer({
  content,
  className,
}: {
  content: BlocksContent
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <BlocksRenderer content={content} />
    </div>
  )
}
