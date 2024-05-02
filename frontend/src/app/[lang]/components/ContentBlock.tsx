import React from 'react'
import { getStrapiMedia } from '../utils/api-helpers'
import Image from 'next/image'
import type { ContentBlock } from '../utils/model'
import RichTextBlockRenderer from './elements/rich-text-block-renderer/RichTextBlockRenderer'

const ContentBlock = ({
  data,
  lang
}: {
  data: ContentBlock
  lang?: string
}) => {
  return (
    <section className='dark:bg-black  dark:text-gray-100 bg-poly-slate-700 bg-no-repeat bg-bottom bg-contain'>
      <div className='container relative flex flex-col justify-center gap-6 p-6 mx-auto sm:py-12 lg:py-24  lg:justify-between'>
        <div className='mb-4 max-w-prose mx-auto h-fit'>
          <h1 className='text-4xl font-bold'>{data.title}</h1>
        </div>

        {data.content.length > 0
          ? data.content.map((item, i) => {
              console.log('ContentBlock', item)
              const imageUrl = item.image.data
                ? getStrapiMedia(item.image?.data.attributes.url)
                : null
              return (
                <div key={i} className=''>
                  <RichTextBlockRenderer
                    content={item.text}
                    className='text-gray-600 text-left max-w-prose mx-auto dark:text-neutral-200 mb-4'
                  />
                  {imageUrl && <HeaderImage imageUrl={imageUrl} />}
                </div>
              )
            })
          : null}
      </div>
    </section>
  )
}

const HeaderImage = ({ imageUrl }: { imageUrl: string }) => (
  <div className='relative w-full h-full max-w-prose max-h-[30rem] mx-auto aspect-video md:aspect-square my-12'>
    <Image
      src={imageUrl}
      alt='alt text'
      layout='fill'
      objectFit='cover'
      className='rounded-xl  aspect-video md:aspect-square'
    />
  </div>
)

export default ContentBlock
