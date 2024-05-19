'use client'
import { getStrapiMedia } from '@/app/[lang]/utils/api-helpers'
import { cn } from '@/app/[lang]/utils/cn'
import { Media } from '@/app/[lang]/utils/model'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
    image: Media
  }[]
  className?: string
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3  py-10',
        className
      )}
    >
      {items.map((item, idx) => {
        const imageUrl = getStrapiMedia(
          item.image.data?.attributes?.url || null
        )
        return (
          <Link
            href={item?.link}
            key={idx}
            className='relative group  block p-2 h-full w-full'
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className='absolute inset-0 h-full w-full bg-blue-200/[0.8] dark:bg-slate-800/[0.8] block  rounded-3xl'
                  layoutId='hoverBackground'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className='flex gap-3'>
                {imageUrl ? (
                  <CardImage
                    url={imageUrl}
                    alt={item.title}
                    className='w-32 h-32 bg-neutral-200 dark:bg-slate-800 rounded-xl'
                  />
                ) : (
                  <NoImage />
                )}
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-2 overflow-hidden bg-white dark:bg-slate-950 border border-transparent dark:border-white/[0.2] group-hover:border-slate-600 relative z-20',
        className
      )}
    >
      <div className='relative z-50'>
        <div className='p-2'>{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h4
      className={cn(
        'text-neutral-800 dark:text-white font-bold tracking-wide',
        className
      )}
    >
      {children}
    </h4>
  )
}

export const CardImage = ({
  url,
  alt = 'alt text',
  className,
}: {
  url: string
  alt?: string
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-full aspect-video md:aspect-square',
        className
      )}
    >
      <Image src={url} alt={alt} fill className='rounded-xl object-cover' />
    </div>
  )
}
export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p
      className={cn(
        'mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className
      )}
    >
      {children}
    </p>
  )
}

const NoImage = () => (
  <div className='w-full h-full bg-neutral-200 dark:bg-slate-800 rounded-xl aspect-video md:aspect-square' />
)
