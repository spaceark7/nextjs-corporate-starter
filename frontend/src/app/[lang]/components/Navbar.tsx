'use client'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'
import { cn } from '../utils/cn'

interface NavLink {
  id: number
  url: string
  newTab: boolean
  text: string
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname()
  const newPath = path.replace(/^\/[^\/]+/, '')

  const isMatch = newPath === url

  return (
    <li className='flex'>
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1  dark:border-transparent no-underline ${
          isMatch && 'dark:text-violet-400 dark:border-violet-400 font-bold'
        }`}
      >
        <p>{text}</p>
      </Link>
    </li>
  )
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname()
  const handleClick = () => {
    closeMenu()
  }
  return (
    <Link
      href={url}
      onClick={handleClick}
      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
        path === url && 'dark:text-violet-400 dark:border-violet-400'
      }}`}
    >
      {text}
    </Link>
  )
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>
  logoUrl: string | null
  logoText: string | null
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  const [isNavVisible, setIsNavVisible] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.scrollY || document.documentElement.scrollTop
      if (currentScrollPosition < scrollPosition) {
        setIsNavVisible(true)
      } else {
        setIsNavVisible(false)
      }
      setScrollPosition(currentScrollPosition)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition])

  return (
    <div
      className={cn(
        'p-2 sticky top-0 z-40 w-full bg-white dark:bg-black dark:text-gray-100 ',
        !isNavVisible
          ? 'transform -translate-y-full ease-in-out duration-200'
          : '-translate-y-0 ease-in-out duration-200',
        scrollPosition > 0 ? 'shadow-md backdrop-blur-lg bg-opacity-15' : ''
      )}
    >
      <div className='container flex justify-between h-16 mx-auto px-0 sm:px-6'>
        <Logo src={logoUrl}>
          {logoText && <h2 className='text-2xl font-bold'>{logoText}</h2>}
        </Logo>

        <div className='items-center flex-shrink-0 hidden lg:flex'>
          <ul className='items-stretch hidden space-x-3 lg:flex'>
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <Transition appear show={mobileMenuOpen} as={Fragment}>
          <Dialog as='div' className='lg:hidden' onClose={setMobileMenuOpen}>
            <div className='fixed inset-0 z-40 bg-gray-600 bg-opacity-75' />{' '}
            {/* Overlay */}
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 -translate-x-full '
              enterTo='opacity-100 -translate-x-0 '
              leave='ease-in duration-200'
              leaveFrom='opacity-100 -translate-x-0 '
              leaveTo='-translate-x-full '
            >
              <Dialog.Panel className='fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10'>
                <div className='flex items-center justify-between'>
                  <a href='#' className='-m-1.5 p-1.5'>
                    <span className='sr-only'>Strapi</span>
                    {logoUrl && (
                      <img className='h-8 w-auto' src={logoUrl} alt='' />
                    )}
                  </a>
                  <button
                    type='button'
                    className='-m-2.5 rounded-md p-2.5 text-white'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='mt-6 flow-root'>
                  <div className='-my-6 divide-y divide-gray-700'>
                    <div className='space-y-2 py-6'>
                      {links.map((item) => (
                        <MobileNavLink
                          key={item.id}
                          closeMenu={closeMenu}
                          {...item}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
        <button
          className='p-4 lg:hidden'
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className='h-7 w-7 text-gray' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}
