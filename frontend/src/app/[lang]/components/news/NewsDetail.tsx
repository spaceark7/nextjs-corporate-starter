import Image from 'next/image'
import React from 'react'
import PageHeader from '../PageHeader'
import { postRenderer } from '../../utils/post-renderer'
import { getStrapiMedia } from '../../utils/api-helpers'
import { NewsModelAttributes } from '../../utils/model'
import RowGroupWithCardList from '../RowGroupWithCardList'

interface NewsPostDetailProps {
  data: NewsModelAttributes
  lang?: string
}

export default function NewsPostDetail({ data, lang }: NewsPostDetailProps) {
  console.log('NewsPostDetail', data)
  const imgUrl = getStrapiMedia(data.cover.data.attributes.url)

  return (
    <section className='dark:bg-slate-950  dark:text-gray-100 '>
      <div className='bg-poly-slate-300 dark:bg-poly-dark-slate-100 bg-no-repeat bg-bottom bg-contain'>
        <div className='container relative flex flex-col justify-center p-6 mx-auto max-w-screen-lg lg:justify-between '>
          <div className='flex relative top-0 left-0 w-full items-center justify-center  lg:mt-0 aspect-[16/9]'>
            <Image
              src={imgUrl || ''}
              alt={
                data.cover.data.attributes.alternativeText || 'none provided'
              }
              className='object-cover w-full '
              fill
            />
          </div>

          <div className='flex flex-col gap-4 max-w-2xl mx-auto'>
            <div className='mb-6'>
              <PageHeader heading={data.title} />
              <h4 className='text-lg font-semibold text-gray-500 dark:text-gray-400'>
                {data.brief_summary}
              </h4>
            </div>
            {data.blocks.map((section, idx) => postRenderer(section, idx))}
          </div>
        </div>
      </div>
      <div>
        <RowGroupWithCardList
          data={{
            title: 'Berita Lainnya',
            id: 1,
            is_news_post: true,
            __component: 'none',
          }}
          slug={data.slug}
          lang={lang}
        />
      </div>
    </section>
  )
}
