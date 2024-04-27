'use client'

import { Fade } from 'react-slideshow-image'
import HeroSlideItem from './HeroSlideItem'
import { getStrapiMedia } from '../utils/api-helpers'
import { type HeroGroup, Item } from '../utils/model'

export interface HeroGroupProps {
  data: HeroGroup
}

const HeroGroup = ({ data }: HeroGroupProps) => {
  console.log('HeroGroup', data)
  return (
    <div>
      <div className='slide-container'>
        <Fade>
          {data.items.map((item, index: number) => {
            const imageUrl = getStrapiMedia(item.image.data.attributes.url)
            return (
              <HeroSlideItem
                key={index}
                imageUrl={imageUrl}
                title={item.title}
                description={item.description}
                buttons={item.actions}
              />
            )
          })}
        </Fade>
      </div>
    </div>
  )
}

export default HeroGroup
