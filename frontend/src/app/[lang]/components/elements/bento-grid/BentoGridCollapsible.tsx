'use client'
import { cn } from '@/app/[lang]/utils/cn'
import { Disclosure, Transition } from '@headlessui/react'
import { BlocksContent } from '@strapi/blocks-react-renderer'
import RichTextBlockRenderer from '../rich-text-block-renderer/RichTextBlockRenderer'
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

export const BentoGridCollapsible = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 w-full  gap-4 max-w-7xl lg:mx-auto lg:w-1/2',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItemCollapsible = ({
  className,
  title,
  description,
  header,
  icon,
  content,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  content: BlocksContent
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div
            className={cn(
              'row-span-1  group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-slate-950 dark:border-white/[0.2] bg-white border-b border-gray-200  flex flex-col ',
              className
            )}
          >
            <Disclosure.Button>
              <div className='flex flex-row justify-between text-left'>
                <div className='flex flex-row space-x-2 text-left'>
                  {header}
                  <div className='transition duration-200 '>
                    {icon}
                    <div className='font-sans font-bold text-neutral-800 text-xl dark:text-neutral-200 mb-2 mt-2'>
                      {title}
                    </div>
                    <div className='font-sans font-normal text-neutral-800 text-lg dark:text-neutral-300'>
                      {description}
                    </div>
                  </div>
                </div>
                <div className='self-center opacity-60 group-hover/bento:opacity-100 transition-all ease-in-out duration-500 '>
                  {open ? (
                    <FiArrowUpRight className='text-neutral-800  dark:text-neutral-200 text-[2rem]' />
                  ) : (
                    <FiArrowDownRight className='text-neutral-800  dark:text-neutral-200 text-[2rem]' />
                  )}
                </div>
              </div>
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='text-gray-500 py-4 max-w-prose'>
                <RichTextBlockRenderer content={content} />
              </Disclosure.Panel>
            </Transition>
          </div>
        </>
      )}
    </Disclosure>
  )
}
