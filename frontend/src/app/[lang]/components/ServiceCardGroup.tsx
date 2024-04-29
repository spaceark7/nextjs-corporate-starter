import React from 'react'
import type { ServiceCardGroup } from '../utils/model'
import RichTextBlockRenderer from './elements/rich-text-block-renderer/RichTextBlockRenderer'
import HighlightedText from './HighlightedText'
import { HoverEffect } from './elements/card-hover/CardHoverEffect'

interface ServiceCardGroupProps {
  data: ServiceCardGroup
}
const ServiceCardGroup = ({ data }: ServiceCardGroupProps) => {
  return (
    <section className='dark:bg-black  dark:text-gray-100 '>
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
          <HoverEffect items={data.items as any} />
        </div>
      </div>
    </section>
  )
}

export default ServiceCardGroup
