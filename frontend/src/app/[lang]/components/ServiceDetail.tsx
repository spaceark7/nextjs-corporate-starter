import React from 'react'
import { ServiceModelAttributes } from '../utils/model'
import { getStrapiMedia } from '../utils/api-helpers'
import Image from 'next/image'
import PageHeader from './PageHeader'
import { sectionRenderer } from '../utils/section-renderer'
import { postRenderer } from '../utils/post-renderer'

interface ServiceDetailProps {
  data: ServiceModelAttributes
  lang?: string
}
export default function ServiceDetail({ data, lang }: ServiceDetailProps) {
  console.log('ServiceDetail', data)
  const imgUrl = getStrapiMedia(data.cover.data.attributes.url)

  return (
    <section className='dark:bg-slate-950  dark:text-gray-100 dark:bg-poly-dark-slate-100 bg-poly-slate-300 bg-no-repeat bg-bottom bg-contain'>
      <div className='flex relative top-0 left-0 w-full items-center justify-center  mt-8 lg:mt-0 aspect-[3/1]'>
        <Image
          src={imgUrl || ''}
          alt={data.cover.data.attributes.alternativeText || 'none provided'}
          className='object-cover w-full '
          fill
        />
      </div>
      <div className='container relative flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24  lg:justify-between'>
        <div className='text-center'>
          <PageHeader heading={data.title} />
        </div>
        <div className='flex flex-col gap-4 max-w-2xl mx-auto'>
          {data.detail.map((section, idx) => postRenderer(section, idx))}
        </div>
      </div>
    </section>
  )
}
