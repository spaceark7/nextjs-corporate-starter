'use client'
import React from 'react'
import type { RowBlock } from '../utils/model'
import { getStrapiMedia } from '../utils/api-helpers'
import Image from 'next/image'
import VideoEmbed from './VideoEmbed'
import { PlayIcon } from '@heroicons/react/24/solid'

interface RowBlockProps {
  data: RowBlock
}
const RowBlock = ({ data }: RowBlockProps) => {
  const imgUrl = getStrapiMedia(data.media.data.attributes.url)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const onVideoPlay = () => {
    setIsPlaying(true)
  }

  return (
    <section className='dark:bg-black dark:text-gray-100'>
      <div
        className={`container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 ${
          data.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } lg:justify-between`}
      >
        <div className='flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left '>
          <h1 className='text-4xl font-bold'>{data.title}</h1>
          <p className='mt-4 break-words'>{data.description}</p>
          <div className='mt-6 space-x-4'>
            {data.action && (
              <a
                href={data.action.url}
                target={data.action.newTab ? '_blank' : '_self'}
                className='btn'
              >
                {data.action.text}
              </a>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center w-full p-6 lg:max-w-md xl:max-w-lg'>
          {/* <img
            className='object-cover w-full h-full rounded-lg'
            src={data.media.data.attributes.url}
            alt={data.media.data.attributes.name}
          /> */}
          {isPlaying ? (
            <VideoEmbed
              data={{
                url: 'https://www.youtube.com/watch?v=4KkVL-l6F5E&list=RD4KkVL-l6F5E&start_radio=1',
              }}
            />
          ) : null}

          {imgUrl && (
            <div
              className={`
              ${isPlaying ? 'hidden' : 'block'}
              relative w-full h-full aspect-video lg:aspect-square rounded-lg`}
            >
              <Image
                className='object-cover w-full h-full rounded-lg'
                src={imgUrl}
                alt={data.media.data.attributes.name}
                fill
              />
              {data.youtube_url ? (
                <PlayIcon
                  className='absolute bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md transition-all duration-300 ease-in-out p-8 w-24 h-24 text-zinc-600 opacity-80 hover:opacity-100 hover:scale-110 hover:bg-red-600  hover:text-white cursor-pointer '
                  onClick={onVideoPlay}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RowBlock
