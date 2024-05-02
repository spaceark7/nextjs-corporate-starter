import React from 'react'
import { fetchAPI } from '../utils/fetch-api'
import { Media, ServiceModel, ServiceModelAttributes } from '../utils/model'
import { BentoGrid, BentoGridItem } from './elements/bento-grid/BentoGrid'
import Image from 'next/image'
import { getStrapiMedia } from '../utils/api-helpers'

export default async function ServiceCollections({ lang }: { lang: string }) {
  console.log('ServiceCollections', lang)
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  const path = `/services`
  const urlParamsObject = {
    sort: { createdAt: 'asc' },
    populate: 'deep',
    locale: lang,
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }

  const responseData = await fetchAPI(path, urlParamsObject, options)


  if (!responseData.data.length) {
    return null
  }
  return (
    <BentoGrid className='mx-auto w-full md:auto-rows-[20rem]'>
      {responseData.data.map((item: ServiceModel, i: number) => {
        console.log('ServiceCollections', item)
        const imageUrl = getStrapiMedia(
          item.attributes.cover.data.attributes.url
        )
        return (
          <BentoGridItem
            key={i}
            title={item.attributes.title}
            description={item.attributes.summary_brief}
            header={imageUrl && <HeaderImage imageUrl={imageUrl} />}
            className={i === 2 || i === 8 ? 'col-span-1 md:col-span-2 ' : ''}
            link={item.attributes.slug}
          />
        )
      })}
    </BentoGrid>
  )
}

const HeaderImage = ({ imageUrl }: { imageUrl: string }) => (
  <div className='relative w-full h-full aspect-video md:aspect-square'>
    <Image
      src={imageUrl}
      alt='alt text'
      layout='fill'
      objectFit='cover'
      className='rounded-xl'
    />
  </div>
)
