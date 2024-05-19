'use client'
import React from 'react'
import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer'
import { cn } from '@/app/[lang]/utils/cn'
import Link from 'next/link'

export default function RichTextBlockRenderer({
  content,
  className,
}: {
  content: BlocksContent
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) => {
            console.log('heading', children, level)
            switch (level) {
              case 1:
                return (
                  <h1 className='text-4xl font-bold font-title'>{children}</h1>
                )
              case 2:
                return (
                  <h2 className='text-3xl font-bold font-title'>{children}</h2>
                )
              case 3:
                return (
                  <h3 className='text-2xl font-bold font-title'>{children}</h3>
                )
              case 4:
                return (
                  <h4 className='text-2xl font-bold font-title'>{children}</h4>
                )
              case 5:
                return (
                  <h5 className='text-xl font-bold font-title'>{children}</h5>
                )
              case 6:
                return (
                  <h6 className='text-lg font-bold font-title'>{children}</h6>
                )
              default:
                return (
                  <h1 className='text-2xlfont-bold font-title'>{children}</h1>
                )
            }
          },
          list: ({ children, format }) => {
            console.log('list', children, format)
            switch (format) {
              case 'ordered':
                return <ol className='list-decimal pl-6 p-4'>{children}</ol>
              case 'unordered':
                return <ul className='list-disc pl-6 p-4'>{children}</ul>
              default:
                return <ul className='list-disc pl-6 p-4'>{children}</ul>
            }
          },
          link: ({ children, url }) => {
            console.log('link', children, url)
            return (
              <Link
                href={url}
                target='_blank'
                className='text-primary-600 dark:text-violet-400 hover:underline'
              >
                {children}
              </Link>
            )
          },
        }}
      />
    </div>
  )
}
