import { getMetaTitle } from './api-helpers'

export const FALLBACK_SEO = {
  title: getMetaTitle(''),
  description: 'Tidak ditemukan',
}
