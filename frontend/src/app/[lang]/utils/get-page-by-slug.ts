import { fetchAPI } from '@/app/[lang]/utils/fetch-api'

export async function getPageBySlug(slug: string | string[], lang: string) {
  if (Array.isArray(slug)) {
    if (slug.length > 1) {
      console.log('slug is an array', slug)
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
      const path = slug[0] === 'news-post' ? `/${slug[0]}` : `/${slug[0]}s`
      const urlParamsObject = {
        filters: { slug: slug[1] },
        locale: lang,
      }
      const options = { headers: { Authorization: `Bearer ${token}` } }
      return await fetchAPI(path, urlParamsObject, options)
    } else {
      console.log('slug in if an array', slug)
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
      const path = `/pages`
      const urlParamsObject = {
        filters: { slug: slug[0] },
        locale: lang,
      }
      const options = { headers: { Authorization: `Bearer ${token}` } }
      return await fetchAPI(path, urlParamsObject, options)
    }
  } else {
    console.log('slug is not an array', slug)
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    const path = `/pages`
    const urlParamsObject = {
      filters: { slug },
      locale: lang,
    }
    const options = { headers: { Authorization: `Bearer ${token}` } }

    console.log(slug, await fetchAPI(path, urlParamsObject, options))
    return await fetchAPI(path, urlParamsObject, options)
  }
}
