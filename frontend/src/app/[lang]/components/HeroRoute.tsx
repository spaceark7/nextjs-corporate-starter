import Image from 'next/image'
import { getStrapiMedia } from '../utils/api-helpers'

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

    image: Picture
  }
}

export default function HeroRoute({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.image.data.attributes.url)
  console.log('HeroRoute data:', imgUrl)
  return (
    <section className='dark:bg-black  dark:text-gray-100'>
      <div className='flex relative top-0 left-0 w-full items-center justify-center  mt-8 lg:mt-0 aspect-[16/9] h-[30dvh] sm:h-[40dvh] lg:h-[60dvh] '>
        <Image
          src={imgUrl || ''}
          alt={data.image.data.attributes.alternativeText || 'none provided'}
          className='object-cover w-full h-[30dvh] sm:h-[40dvh] lg:h-[60dvh]'
          fill
        />
      </div>
    </section>
  )
}
