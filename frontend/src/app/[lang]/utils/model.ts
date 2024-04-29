import { BlocksContent } from '@strapi/blocks-react-renderer'

type StrapiResponse<T> = {
  data: T
  message: string
}

export interface Attribute {
  url: string
  alternativeText?: any
  caption?: any
  width: number
  height: number
}

export interface Data {
  id: number
  attributes: Attribute
}

export interface Picture {
  data: Data
}

export interface Button {
  id: number
  url: string
  newTab: boolean
  text: string
  type: string
}

export interface ContentSection {
  id: number
  __component: string
  title: string
  description: string
  picture: Picture
  buttons: Button[]
}

export interface Attribute {
  shortName: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  heading?: any
  description?: any
  contentSections: ContentSection[]
}

export interface Data {
  id: number
  attributes: Attribute
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Meta {
  pagination: Pagination
}

export interface RootObject {
  data: Data[]
  meta: Meta
}

export interface HeroGroup {
  id: number
  __component: string
  items: Item[]
}

export interface Item {
  id: number
  title: string
  description: string
  image: Image
  actions: Action[]
}

export interface RowBlock {
  id: number
  __component: string
  title: string
  description: string
  reverse: boolean
  media: Media
  action?: Action
  youtube_url?: string
}

export interface Action {
  id: number
  url: string
  newTab: boolean
  text: string
  type: null
}

export interface Image {
  data: ImageData
}

export interface ImageData {
  id: number
  attributes: MediaAttributes
}
export interface Media {
  data: MediaData
}

export interface MediaData {
  id: number
  attributes: MediaAttributes
}

export interface MediaAttributes {
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime:
    | string
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp'
    | 'video/mp4'
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: Date
  updatedAt: Date
}

export interface Formats {
  large: FormatInfo
  small: FormatInfo
  medium: FormatInfo
  thumbnail: FormatInfo
}

export interface FormatInfo {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: null
  size: number
  width: number
  height: number
}

export interface ServiceGroup {
  id: number
  __component: string
  title: string
  description: string
  header_title: string
  items: ServiceItem[]
  is_service_collection?: boolean
}

export interface ServiceCardGroup {
  id: number
  __component: string
  title: string
  text: BlocksContent
  items: ServiceItem[]
}

export interface RowGroupCardList {
  id: number
  __component: string
  title: string
  is_news_post: boolean
  items?: ServiceItem[]
}

export interface ServiceItem {
  id: number
  title: string
  description: string
  link: string
  image: Media
}

export interface ServiceModel {
  id: number
  attributes: ServiceModelAttributes
}

export interface ServiceModelAttributes {
  title: string
  summary_brief: string
  createdAt: Date
  updatedAt: Date
  slug: string
  publishedAt: Date
  locale: string
  cover: Media
  detail: Detail[]
}

export interface Detail {
  id: number
  __component: string
  text: BlocksContent
}

export interface NewsModel {
  id: number
  attributes: NewsModelAttributes
}

export interface NewsModelAttributes {
  title: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  slug: string
  brief_summary: string
  cover: Media
  blocks: BlocksContent
}
