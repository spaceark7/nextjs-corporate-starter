'use client'

import { getStrapiMedia } from '@/app/[lang]/utils/api-helpers'
import { cn } from '@/app/[lang]/utils/cn'
import { UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    text: string
    customer: string
    company: string
    picture: {
      data: {
        id: string
        attributes: {
          name: string
          alternativeText: string
          url: string
        }
      }
    }
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        )
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => {
          const imageUrl = getStrapiMedia(item.picture.data.attributes.url)
          return (
            <li
              className='w-[20rem] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[28rem]'
              style={{
                background:
                  'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
              }}
              key={item.customer}
            >
              <blockquote>
                <div
                  aria-hidden='true'
                  className='user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]'
                ></div>
                <span className='relative z-20 text-sm leading-[1.6] text-gray-100 font-normal'>
                  {item.text}
                </span>
                <div className='relative z-20 mt-6 flex flex-row items-center'>
                  <div className='flex  flex-row gap-1'>
                    {imageUrl ? (
                      <div className='relative w-12 h-12 rounded-full :aspect-square'>
                        <Image
                          src={imageUrl}
                          alt='alt text'
                          layout='fill'
                          className='object-cover aspect-square rounded-full'
                        />
                      </div>
                    ) : (
                      <NoAvatar />
                    )}

                    <span className='flex flex-col '>
                      <span className=' text-sm leading-[1.6] text-gray-400 font-normal'>
                        {item.customer}
                      </span>
                      <span className=' text-sm leading-[1.6] text-gray-400 font-normal'>
                        {item.company}
                      </span>
                    </span>
                  </div>
                </div>
              </blockquote>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const NoAvatar = () => (
  <div className='w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center'>
    <UserIcon className='w-6 h-6 text-gray-500' />
  </div>
)
