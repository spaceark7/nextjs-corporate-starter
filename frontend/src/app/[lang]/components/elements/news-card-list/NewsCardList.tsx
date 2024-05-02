import { fetchAPI } from '@/app/[lang]/utils/fetch-api'
import { NewsModel } from '@/app/[lang]/utils/model'
import React from 'react'
import NewsCardItem from './NewsCardItem'
import { cn } from '@/app/[lang]/utils/cn'
import Link from 'next/link'
import { renderButtonStyle } from '@/app/[lang]/utils/render-button-style'

export default async function NewsCardList({
  className,
  lang
}: {
  className?: string
  lang?: string
}) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  const path = `/news-post`
  const urlParamsObject = {
    sort: { createdAt: 'desc' },
    populate: 'deep',
    pagination: {
      start: 0,
      limit: 8
    },
    locale: lang
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }
  const responseData = await fetchAPI(path, urlParamsObject, options)

  if (!responseData.data.length) {
    return null
  }

  return (
    <>
      <div
        className={cn(
          'grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4',
          className
        )}>
        {responseData.data.map((news: NewsModel) => (
          <NewsCardItem key={news.id} data={news.attributes} />
        ))}
      </div>
      <Link href={'/news'} className='w-full flex justify-center mt-8'>
        <button className={renderButtonStyle('primary')}>See More</button>
      </Link>
    </>
  )
}
