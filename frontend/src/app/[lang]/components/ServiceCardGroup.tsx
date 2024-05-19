import React from 'react'
import type { ServiceCardGroup } from '../utils/model'
import RichTextBlockRenderer from './elements/rich-text-block-renderer/RichTextBlockRenderer'
import HighlightedText from './HighlightedText'
import { HoverEffect } from './elements/card-hover/CardHoverEffect'
import { fetchAPI } from '../utils/fetch-api'

interface ServiceCardGroupProps {
  data: ServiceCardGroup
  lang?: string
}
const ServiceCardGroup = async ({ data, lang }: ServiceCardGroupProps) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  const path = `/services`
  const urlParamsObject = {
    sort: { createdAt: 'asc' },
    populate: 'deep',
    locale: lang || 'id',
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }

  const responseData = await fetchAPI(path, urlParamsObject, options)

  if (!responseData.data.length) {
    return null
  }

  const items = responseData.data.map((item: any, i: number) => {
    return {
      title: item.attributes.title,
      description: item.attributes.summary_brief,
      link: `/service/${item.attributes.slug}`,
      image: item.attributes.cover,
    }
  })

  return (
    <section className='dark:bg-slate-950 dark:bg-poly-dark-slate-100 dark:text-gray-100 bg-poly-slate-700 bg-no-repeat bg-bottom bg-contain'>
      <div className='container relative flex flex-col justify-center p-6 mx-auto sm:py-12   lg:justify-between'>
        <div className='mb-4  mx-auto h-fit'>
          <div className='flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-3xl  lg:text-left'>
            <HighlightedText
              text={data.title}
              tag='h1'
              className='text-3xl font-bold  text-center  leading-none sm:text-3xl mb-8'
              color='dark:text-violet-400'
            />

            <RichTextBlockRenderer
              content={data.text}
              className='text-gray-600 text-left dark:text-neutral-200 '
            />
          </div>
        </div>
        <div className=' mx-auto px-8'>
          <HoverEffect items={items} />
        </div>
      </div>
    </section>
  )
}

export default ServiceCardGroup
