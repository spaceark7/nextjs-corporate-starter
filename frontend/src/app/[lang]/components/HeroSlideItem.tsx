'use client'

import Image from 'next/image'

interface HeroSlideItemProps {
  imageUrl?: string | null
  title: string
  description: string
  buttons: any[]
}

export default function HeroSlideItem({
  imageUrl,

  title,
  description,
  buttons,
}: HeroSlideItemProps) {
  console.log(buttons)
  return (
    <div className='w-full h-[100dvh] relative'>
      {imageUrl && (
        <Image
          className='w-full  object-cover rounded-lg'
          height={400}
          width={600}
          alt='alt text'
          src={imageUrl}
        />
      )}
      <div className='absolute flex items-center top-0 left-0 w-full h-full bg-gradient-to-r from-white via-transparent to-transparent'>
        <div className='left-0 w-full p-6 pl-20 text-neutral-900'>
          <h1 className='text-4xl font-bold'>{title}</h1>
          <p className='mt-4'>{description}</p>
          <div className='mt-6 space-x-4'>
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.url}
                target={button.newTab ? '_blank' : '_self'}
                className='px-4 py-2 text-white bg-blue-500 rounded-md'
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
