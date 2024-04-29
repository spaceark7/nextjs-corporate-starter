'use client'

import { Transition } from '@headlessui/react'
import Image from 'next/image'

interface HeroSlideItemProps {
  imageUrl?: string | null
  title: string
  description: string
  buttons: any[]
  fadeIn?: boolean
  fadeOut?: boolean
  index?: number
}

export default function HeroSlideItem({
  imageUrl,
  title,
  description,
  buttons,
  fadeIn,
}: HeroSlideItemProps) {
  return (
    <>
      <div className='hidden md:block w-full h-[100dvh] relative'>
        {imageUrl && (
          <Transition
            show={fadeIn}
            enter='transition-all duration-1000'
            enterFrom='opacity-0 scale-150'
            enterTo='opacity-100 scale-100'
            leave='transition-opacity duration-1000 '
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0  duration-1000'
          >
            <Image
              className='w-full object-cover rounded-lg transition-all duration-300 ease-in-out transform'
              height={400}
              width={600}
              alt='alt text'
              src={imageUrl}
            />
          </Transition>
        )}
        <div className='absolute flex items-center top-0 left-0 w-full h-full bg-gradient-to-r from-white via-transparent to-transparent'>
          <div className='left-0 w-full p-6 pl-20 text-neutral-900 '>
            <Transition
              show={fadeIn}
              enter='transition duration-500'
              enterFrom='-translate-x-full'
              enterTo='opacity-100 -translate-x-0 delay-500'
              leave='transition-opacity duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
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
            </Transition>
          </div>
        </div>
      </div>
      <div className='md:hidden flex flex-col w-full h-[100dvh] relative pt-20'>
        <div className='flex items-center w-full  '>
          <div className='left-0 w-full p-6 pl-20 text-neutral-900 '>
            <Transition
              show={fadeIn}
              enter='transition duration-500'
              enterFrom='-translate-x-full'
              enterTo='opacity-100 -translate-x-0 delay-500'
              leave='transition-opacity duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
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
            </Transition>
          </div>
        </div>
        <div className='flex-1'>
          {imageUrl && (
            <Transition
              show={fadeIn}
              enter='transition-all duration-1000'
              enterFrom='opacity-0 scale-150'
              enterTo='opacity-100 scale-100'
              leave='transition-opacity duration-1000 '
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0  duration-1000'
              className='w-full h-full'
            >
              <div className='relative w-full h-full aspect-video md:aspect-square'>
                <Image
                  src={imageUrl}
                  alt='alt text'
                  layout='fill'
                  className='object-cover aspect-video'
                />
              </div>
            </Transition>
          )}
        </div>
      </div>
    </>
  )
}
