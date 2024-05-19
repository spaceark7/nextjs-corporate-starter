import Link from 'next/link'

export default function Error() {
  return (
    <section className='dark:bg-slate-950 dark:text-gray-100 dark:bg-poly-dark-slate-100  bg-poly-slate-300 bg-no-repeat bg-bottom bg-contain min-h-[80dvh]'>
      <div
        className={`container flex flex-col items-center h-96 p-6 mx-auto sm:py-12 lg:py-24 justify-center gap-8`}
      >
        <h1 className='text-4xl font-semibold leading-none font-title text-center'>
          404 - Page Not Found'
        </h1>
        <Link
          className='text-primary-800 border-2 border-primary-800 p-4 rounded-full'
          href='/'
        >
          Back to Main Page
        </Link>
      </div>
    </section>
  )
}
