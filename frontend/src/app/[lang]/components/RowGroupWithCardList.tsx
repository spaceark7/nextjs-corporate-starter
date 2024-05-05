import React from 'react'
import NewsCardList from './elements/news-card-list/NewsCardList'
import type { RowGroupCardList } from '../utils/model'

interface RowGroupWithCardListProps {
  data: RowGroupCardList
  lang?: string
}

export default function RowGroupWithCardList({
  data,
  lang,
}: RowGroupWithCardListProps) {
  return (
    <section className='dark:bg-black dark:text-gray-100 '>
      <div
        className={`container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:justify-between`}
      >
        <div className='container mx-auto py-4 space-y-2 text-center'>
          <h1 className='text-4xl font-semibold leading-none text-center'>
            {data.title}
          </h1>
        </div>
        <div>{data.is_news_post ? <NewsCardList lang={lang} /> : null}</div>
      </div>
    </section>
  )
}
