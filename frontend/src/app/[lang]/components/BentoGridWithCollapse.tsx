import React from 'react'
import { BentoGrid, BentoGridItem } from './elements/bento-grid/BentoGrid'
import type { BentoGridWithCollapsible, ServiceGroup } from '../utils/model'
import { getStrapiMedia } from '../utils/api-helpers'
import Image from 'next/image'
import ServiceCollections from './ServiceCollections'
import {
  BentoGridCollapsible,
  BentoGridItemCollapsible,
} from './elements/bento-grid/BentoGridCollapsible'
import { FaArrowUp } from 'react-icons/fa'

const BentoGridWithCollapsible = ({
  data,
  lang,
}: {
  data: BentoGridWithCollapsible
  lang?: string
}) => {
  return (
    <section className='dark:bg-black  dark:text-gray-100'>
      <div className='container relative flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between'>
        <div className='lg:sticky left-0 top-1/4 bottom-1/2 mb-4 max-w-prose mx-auto h-fit'>
          <h1 className='text-4xl font-bold'>{data.title}</h1>
          <p className='mt-4 break-words'>{data.description}</p>
        </div>

        {data.items.length ? (
          <BentoGridCollapsible>
            {data.items.map((item, i) => {
              console.log('BentoGridItem', item)
              const imageUrl = getStrapiMedia(item.image.data.attributes.url)
              return (
                <BentoGridItemCollapsible
                  key={i}
                  title={item.title}
                  description={item.description}
                  content={item.content}
                  header={imageUrl && <HeaderImage imageUrl={imageUrl} />}
                />
              )
            })}
          </BentoGridCollapsible>
        ) : null}
      </div>
    </section>
  )
}

const HeaderImage = ({ imageUrl }: { imageUrl: string }) => (
  <div className='relative w-[8rem] h-[8rem] aspect-square'>
    <Image
      src={imageUrl}
      alt='alt text'
      layout='fill'
      objectFit='cover'
      className='rounded-xl aspect-square '
    />
  </div>
)

export default BentoGridWithCollapsible
