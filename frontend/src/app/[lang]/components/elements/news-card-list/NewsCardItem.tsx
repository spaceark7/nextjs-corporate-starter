import { formatDate, getStrapiMedia } from '@/app/[lang]/utils/api-helpers'
import { NewsModelAttributes } from '@/app/[lang]/utils/model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type NewsProps = NewsModelAttributes
export default function NewsCardItem({ data }: { data: NewsProps }) {
  const imageUrl = getStrapiMedia(data.cover.data?.attributes.url)
  return (
    <Link
      href={`/news/${data.slug}`}
      key={data.slug}
      className='max-w-sm mx-auto group hover:no-underline pb-2 focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[10rem] rounded-2xl overflow-hidden shadow-lg'
    >
      {imageUrl && (
        <Image
          alt='presentation'
          width='240'
          height='240'
          className='object-cover w-full h-44 '
          src={imageUrl}
        />
      )}
      <div className='p-6 space-y-2 relative'>
        <h3 className='text-2xl font-semibold group-hover:underline group-focus:underline'>
          {data.title}
        </h3>

        <div className='flex justify-between items-center'>
          <span className='text-xs dark:text-gray-400'>
            {formatDate(data.publishedAt.toString())}
          </span>
        </div>
        <p className='py-4 text-ellipsis text-clip max-h-[4rem] text-zinc-600 dark:text-neutral-300 overflow-hidden'>
          {data.brief_summary}
        </p>
      </div>
    </Link>
  )
}
