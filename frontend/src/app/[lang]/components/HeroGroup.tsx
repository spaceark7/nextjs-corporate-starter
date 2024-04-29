'use client'

import { Fade } from 'react-slideshow-image'
import HeroSlideItem from './HeroSlideItem'
import { getStrapiMedia } from '../utils/api-helpers'
import { type HeroGroup } from '../utils/model'
import React from 'react'

export interface HeroGroupProps {
  data: HeroGroup
}

const HeroGroup = ({ data }: HeroGroupProps) => {
  const [current, setCurrent] = React.useState(0)
  return (
    <div>
      <div className='slide-container'>
        <Fade
          onStartChange={(oldIndex, newIndex) => {
            console.log(`fade start change from ${oldIndex} to ${newIndex}`)
            setCurrent(newIndex)
          }}
          onChange={(oldIndex, newIndex) => {
            console.log(`fade change from ${oldIndex} to ${newIndex}`)
            setCurrent(newIndex)
          }}
          pauseOnHover={false}
        >
          {data.items.map((item, index: number) => {
            const imageUrl = getStrapiMedia(item.image.data.attributes.url)
            return (
              <HeroSlideItem
                key={index}
                imageUrl={imageUrl}
                title={item.title}
                description={item.description}
                buttons={item.actions}
                fadeIn={current === index}
                fadeOut={current !== index}
                index={index}
              />
            )
          })}
        </Fade>
      </div>
    </div>
  )
}

export default HeroGroup
