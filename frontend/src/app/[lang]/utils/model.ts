type StrapiResponse<T> = {
  data: T;
  message: string;
};

export interface Attribute {
	url: string;
	alternativeText?: any;
	caption?: any;
	width: number;
	height: number;
}

export interface Data {
	id: number;
	attributes: Attribute;
}

export interface Picture {
	data: Data;
}

export interface Button {
	id: number;
	url: string;
	newTab: boolean;
	text: string;
	type: string;
}

export interface ContentSection {
	id: number;
	__component: string;
	title: string;
	description: string;
	picture: Picture;
	buttons: Button[];
}

export interface Attribute {
	shortName: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	heading?: any;
	description?: any;
	contentSections: ContentSection[];
}

export interface Data {
	id: number;
	attributes: Attribute;
}

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface Meta {
	pagination: Pagination;
}

export interface RootObject {
	data: Data[];
	meta: Meta;
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
  attributes: ImageAttributes
}

export interface ImageAttributes {
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: Date
  updatedAt: Date
}

export interface Formats {
  large: Large
  small: Large
  medium: Large
  thumbnail: Large
}

export interface Large {
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
