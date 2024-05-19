import { Metadata } from 'next'
import React from 'react'
import { getMetaTitle } from '../utils/api-helpers'
import Link from 'next/link'

export const metadata: Metadata = {
  title: getMetaTitle('404 - Page Not Found'),
  description: 'Tidak ditemukan',
}

export default function NotFound({ lang }: { lang?: string }) {
  return (
    <section className='dark:bg-slate-950 dark:text-gray-100 dark:bg-poly-dark-slate-100 bg-poly-slate-300 bg-no-repeat bg-bottom bg-contain min-h-[80dvh]'>
      <div
        className={`container flex flex-col items-center justify-center h-96 p-6 mx-auto sm:py-12 lg:py-24 gap-8`}
      >
        <h1 className='text-4xl font-title font-semibold leading-none text-center'>
          {lang === 'en'
            ? '404 - Page Not Found'
            : '404 - Halaman Tidak Ditemukan'}
        </h1>
        <Link
          className='text-primary-800 border-2 border-primary-800 p-4 rounded-full'
          href='/'
        >
          {lang === 'en' ? 'Back to Main Page' : 'Kembali ke Laman Utama'}
        </Link>
      </div>
    </section>
  )
}
