import Image from 'next/image'
import { getStrapiMedia } from '../utils/api-helpers'
import { ContainerScroll } from './elements/container-scroll-animation/ContainerScrollAnimation'

interface Picture {
  data: {
    id: string
    attributes: {
      url: string
      name: string
      alternativeText: string
    }
  }
}

interface HeroProps {
  data: {
    id: string
    title?: string
    subtitle?: string
    description?: string
    use_parallax: boolean
    image: Picture
  }
}

export default function HeroRoute({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.image.data.attributes.url)
  return (
    <section className='dark:bg-black  dark:text-gray-100'>
      {data.use_parallax ? (
        <ContainerScroll
          titleComponent={
            <>
              <h1 className='text-4xl font-semibold text-black dark:text-white'>
                {data.title} <br />
                <span className='text-4xl md:text-[4rem] font-bold mt-1 leading-none'>
                  {data.subtitle}
                </span>
              </h1>
              <p className='py-8 mx-auto max-w-prose'>{data.description}</p>
            </>
          }>
          <Image
            src={imgUrl || ''}
            alt={data.image.data.attributes.alternativeText || 'none provided'}
            className='object-cover w-full h-[30dvh] sm:h-[40dvh] lg:h-[60dvh]'
            fill
          />
        </ContainerScroll>
      ) : (
        <div className='flex relative top-0 left-0 w-full items-center justify-center  mt-8 lg:mt-0 aspect-[16/9] h-[30dvh] sm:h-[40dvh] lg:h-[60dvh] '>
          <Image
            src={imgUrl || ''}
            alt={data.image.data.attributes.alternativeText || 'none provided'}
            className='object-cover w-full h-[30dvh] sm:h-[40dvh] lg:h-[60dvh]'
            fill
          />
        </div>
      )}
    </section>
  )
}
