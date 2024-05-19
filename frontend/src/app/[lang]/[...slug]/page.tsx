import { sectionRenderer } from '@/app/[lang]/utils/section-renderer'
import { Metadata } from 'next'
import { getPageBySlug } from '@/app/[lang]/utils/get-page-by-slug'
import { FALLBACK_SEO } from '@/app/[lang]/utils/constants'
import NotFound from '../components/NotFound'
import { getMetaTitle, getStrapiMedia } from '../utils/api-helpers'

type Props = {
  params: {
    lang: string
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug, params.lang)
  console.log('generateMetadata', page)

  if (page.data?.length === 0 || !page.data) return FALLBACK_SEO

  if (!page.data[0].attributes?.seo) return FALLBACK_SEO
  const metadata = page.data[0].attributes.seo
  console.log('Metadata:image', metadata.shareImage)
  const image = metadata.shareImage.data
    ? getStrapiMedia(metadata.shareImage.data.attributes.url)
    : null

  return {
    title: getMetaTitle(metadata.metaTitle),
    description: metadata.metaDescription,
    openGraph: {
      images: image ?? [],
    },
  }
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang)
  if (page.data?.length === 0 || !page.data) return <NotFound />

  if (Array.isArray(params.slug)) {
    console.log('params.slug', params.slug.length > 1)
    if (params.slug.length > 1) {
      const content = {
        ...page.data[0].attributes,
        __component: `${params.slug[0]}-detail`,
      }
      console.log('params.slug:content', content)
      return sectionRenderer(content, 0, params.lang)
    } else {
      const contentSections = page.data[0].attributes.contentSections
      console.log('contentSections', contentSections)
      return contentSections.map((section: any, index: number) => {
        return sectionRenderer(section, index, params.lang)
      })
    }
  } else {
    const contentSections = page.data[0].attributes.contentSections

    return contentSections.map((section: any, index: number) => {
      return sectionRenderer(section, index, params.lang)
    })
  }
}
