'use client'
import React, { use, useCallback, useEffect } from 'react'
import {
  Fieldset,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from '@headlessui/react'
import type { FormField } from '../../utils/model'
import { cn } from '../../utils/cn'

import { Control, Controller, FieldValues, useForm } from 'react-hook-form'
interface FormProps {
  fields: FormField[]
}
const FormView: React.FC<FormProps> = ({ fields }) => {
  const messageRef = React.useRef<any>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm()

  const onSubmit = (e: any) => {
    console.log('submit', e)
    // TODO: Implement form submission
  }

  const fnHandleSubmit = useCallback(() => handleSubmit(onSubmit)(), [])

  return (
    <div className='max-w-xl mx-auto  border dark:border-slate-600 dark:bg-slate-900 p-12 rounded-lg'>
      <Fieldset className='space-y-4'>
        {fields.map((field) => (
          <FormRenderer
            key={field.id}
            type={field.type}
            control={control}
            label={field.label}
            inputField={field}
            required={field.required}
          />
        ))}
      </Fieldset>
      <button
        className='mt-4 text-lg font-medium w-full bg-primary-800 text-white mt-12 rounded-lg py-2 px-4 disabled:bg-gray-300 disabled:text-gray-500'
        onClick={fnHandleSubmit}
        disabled={isSubmitting}
      >
        Submit
      </button>
      {/* <div
        ref={messageRef}
        className={cn(
          'text-lg font-medium dark:text-white w-full mt-4 p-6 transition-all ease-in-out duration-300 rounded-lg',
          state.status === 'error' && 'text-red-800 bg-red-200',
          state.status === 'success' && 'text-green-800 bg-green-100'
        )}
      >
        {state.message}
      </div> */}
    </div>
  )
}
const FormRenderer = ({
  label,
  control,
  required = false,
  type,
  inputField,
}: {
  label: string
  type: string
  required?: boolean
  control: Control<FieldValues, any>
  inputField: FormField
}) => {
  switch (type) {
    case 'text':
      return (
        <Controller
          name={label.toLowerCase().replace(/ /g, '_')}
          control={control}
          rules={{
            required: {
              value: required,
              message: 'Wajib diisi',
            },
          }}
          render={({ field, fieldState }) => (
            <Field>
              <Label
                className={cn(
                  'text-lg font-medium dark:text-white',
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </Label>
              <Input
                type='text'
                onChange={field.onChange}
                className={cn(
                  'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
                  'focus:outline-none  data-[focus]:outline-2 data-[focus]:-outline-offset-2  data-[invalid]:outline-red-700 '
                )}
              />
              <small className='text-red-500'>
                {fieldState.error?.message}
              </small>
            </Field>
          )}
        />
      )
    case 'textarea':
      return (
        <Controller
          name={label.toLowerCase().replace(/ /g, '_')}
          control={control}
          rules={{
            required: {
              value: required,
              message: 'Wajib diisi',
            },
          }}
          render={({ field, fieldState }) => (
            <Field>
              <Label
                className={cn(
                  'text-lg font-medium dark:text-white',
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </Label>
              <Textarea
                onChange={field.onChange}
                className={cn(
                  'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
                  'focus:outline-none  data-[focus]:outline-2 data-[focus]:-outline-offset-2  data-[invalid]:outline-red-700 '
                )}
              />
              <small className='text-red-500'>
                {fieldState.error?.message}
              </small>
            </Field>
          )}
        />
      )
    case 'number':
      return (
        <Controller
          name={label.toLowerCase().replace(/ /g, '_')}
          control={control}
          rules={{
            required: {
              value: required,
              message: 'Wajib diisi',
            },
          }}
          render={({ field, fieldState }) => (
            <Field>
              <Label
                className={cn(
                  'text-lg font-medium dark:text-white',
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </Label>
              <Input
                type='number'
                onChange={field.onChange}
                className={cn(
                  'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-700/45'
                )}
              />
              <small className='text-red-500'>
                {fieldState.error?.message}
              </small>
            </Field>
          )}
        />
      )
    case 'email':
      return (
        <Controller
          name={label.toLowerCase().replace(/ /g, '_')}
          control={control}
          rules={{
            required: {
              value: required,
              message: 'Wajib diisi',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Email tidak valid',
            },
          }}
          render={({ field, fieldState }) => (
            <Field>
              <Label
                className={cn(
                  'text-lg font-medium dark:text-white',
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </Label>
              <Input
                type='email'
                onChange={field.onChange}
                className={cn(
                  'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-700/45'
                )}
              />
              <small className='text-red-500'>
                {fieldState.error?.message}
              </small>
            </Field>
          )}
        />
      )
    case 'dropdown': {
      if (!inputField.options.data) {
        return null
      }
      return (
        <Controller
          name={label.toLowerCase().replace(/ /g, '_')}
          control={control}
          rules={{
            required: {
              value: required,
              message: 'Wajib diisi',
            },
          }}
          render={({ field, fieldState }) => (
            <Field>
              <Label
                className={cn(
                  'text-lg font-medium dark:text-white',
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </Label>
              <Select
                onChange={field.onChange}
                className={cn(
                  'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-700/45'
                )}
              >
                {inputField.options.data?.map((option) => (
                  <option key={option.id} value={option.attributes.option}>
                    {option.attributes.option}
                  </option>
                ))}
              </Select>
              <small className='text-red-500'>
                {fieldState.error?.message}
              </small>
            </Field>
          )}
        />
      )
    }

    default:
      return null
  }
}

export default FormView
