import React from 'react'
import { SubmitFormModel } from '../../utils/model'
import FormView from './Form'
type SubmitProps = {
  data: SubmitFormModel
}

export default function FormSubmit({ data }: SubmitProps) {
  return (
    <section className='dark:bg-slate-950 dark:text-gray-100 '>
      <div
        className={`container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:justify-between`}
      >
        <div className='container mx-auto py-4 space-y-2 text-center mb-8'>
          <h1 className='text-3xl lg:text-5xl font-semibold font-title leading-none text-center'>
            {data.title}
          </h1>
          <p className='max-w-prose mx-auto'>{data.description}</p>
        </div>
        <div>
          <FormView fields={data.form_fields} />
        </div>
      </div>
    </section>
  )
}
