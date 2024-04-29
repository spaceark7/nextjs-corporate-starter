import React from 'react'
import { BentoGrid, BentoGridItem } from './elements/bento-grid/BentoGrid'
import type { ServiceGroup } from '../utils/model'
import { getStrapiMedia } from '../utils/api-helpers'
import Image from 'next/image'
import ServiceCollections from './ServiceCollections'

interface ServiceGroupProps {
  data: ServiceGroup
}
const ServiceGroup = ({
  data,
  lang,
}: {
  data: ServiceGroup
  lang?: string
}) => {
  return (
    <section className='dark:bg-black  dark:text-gray-100'>
      <div className='container relative flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between'>
        <div className='lg:sticky left-0 top-1/4 bottom-1/2 mb-4 max-w-prose mx-auto h-fit'>
          <p className='text-neutral-500 dark:text-neutral-400 uppercase mb-3 font-bold'>
            {data.header_title}
          </p>
          <h1 className='text-4xl font-bold'>{data.title}</h1>
          <p className='mt-4 break-words'>{data.description}</p>
        </div>
        {data.is_service_collection ? (
          <ServiceCollections lang={lang || 'en'} />
        ) : (
          <BentoGrid className='mx-auto w-full md:auto-rows-[20rem]'>
            {data.items.map((item, i) => {
              const imageUrl = getStrapiMedia(item.image.data.attributes.url)
              return (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={imageUrl && <HeaderImage imageUrl={imageUrl} />}
                  className={
                    i === 2 || i === 8 ? 'col-span-1 md:col-span-2 ' : ''
                  }
                />
              )
            })}
          </BentoGrid>
        )}
      </div>
    </section>
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

export default ServiceGroup
