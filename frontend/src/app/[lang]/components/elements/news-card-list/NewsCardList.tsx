'use client'

import { fetchAPI } from '@/app/[lang]/utils/fetch-api'
import { NewsModel } from '@/app/[lang]/utils/model'
import React, { useCallback, useEffect, useState } from 'react'
import NewsCardItem from './NewsCardItem'
import { cn } from '@/app/[lang]/utils/cn'
import Link from 'next/link'
import { renderButtonStyle } from '@/app/[lang]/utils/render-button-style'
import Loader from '../../Loader'
import { usePathname } from 'next/navigation'

interface Meta {
  pagination: {
    start: number
    limit: number
    total: number
  }
}

export default function NewsCardList({
  className,
  lang,
}: {
  className?: string
  lang?: string
}) {
  const [meta, setMeta] = useState<Meta | undefined>()
  const [data, setData] = useState<any>([])
  const [isLoading, setLoading] = useState(true)
  const [isLimitReached, setLimitReached] = useState(false)
  const pathname = usePathname()
  const isNewsPostPage = pathname.includes('news-post')

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
      const path = `/news-post`
      const urlParamsObject = {
        sort: { createdAt: 'desc' },
        populate: 'deep',
        pagination: {
          start: start,
          limit: limit,
        },
        locale: lang,
      }
      const options = { headers: { Authorization: `Bearer ${token}` } }
      const responseData = await fetchAPI(path, urlParamsObject, options)

      if (start === 0) {
        setData(responseData.data)
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data])
      }

      if (responseData.data.length === 0) {
        setLimitReached(true)
      }

      setMeta(responseData.meta)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  }
  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  }, [fetchData])

  if (isLoading) return <Loader />

  return (
    <>
      <div
        className={cn(
          'grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4',
          className
        )}
      >
        {data.map((news: NewsModel) => (
          <NewsCardItem key={news.id} data={news.attributes} />
        ))}
        {/* {responseData.data.map((news: NewsModel) => (
          <NewsCardItem key={news.id} data={news.attributes} />
        ))} */}
      </div>

      {isNewsPostPage ? (
        <div className='w-full flex justify-center mt-8'>
          <button
            onClick={loadMorePosts}
            className={cn(
              renderButtonStyle('primary'),
              isLimitReached ? 'hidden' : ''
            )}
          >
            {lang === 'id' ? 'Muat Lebih banyak' : 'Load more'}
          </button>
        </div>
      ) : (
        <Link href={'/news-post'} className='w-full flex justify-center mt-8'>
          <button className={renderButtonStyle('primary')}>See More</button>
        </Link>
      )}
    </>
  )
}
