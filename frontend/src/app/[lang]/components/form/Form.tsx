'use client'
import React, { use, useCallback, useEffect } from 'react'
import {
  Fieldset,
  Field,
  Input,
  Label,
  Select,
  Textarea,
  Checkbox,
} from '@headlessui/react'
import type { FormField } from '../../utils/model'
import { cn } from '../../utils/cn'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useFormState } from 'react-dom'
import { onFormPostAction } from './formActions'
interface FormProps {
  fields: FormField[]
}
const FormView: React.FC<FormProps> = ({ fields }) => {
  const [values, setValues] = React.useState<any[]>([])
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const messageRef = React.useRef<any>(null)
  const [state, action] = useFormState(onFormPostAction, {
    status: 'idle',
    message: '',
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', values)
  }
  const onChangeValue = useCallback(
    (e: { label: string; value: string }) => {
      let isUpdated = false

      if (e.value.length > 250) {
        alert('You have reached the maximum number of fields')
        const newvalues = values.map((v) => {
          if (v.label === e.label) {
            return {
              ...v,
              value: e.value,
              invalid: 1,
            }
          }
          return v
        })
        setValues(newvalues)
      } else {
        const newValues = values.map((v) => {
          if (v.label === e.label) {
            isUpdated = true
            return {
              ...v,
              value: e.value,
              invalid: v.invalid ? 0 : v.invalid,
            }
          }
          return v
        })

        if (!isUpdated) {
          newValues.push({
            value: e.value,
            label: e.label,
          })
        }

        setValues(newValues)
      }
    },
    [values, setValues]
  )
  // const onChangeValue = (e: { label: string; value: string }) => {
  //   const find = values.find((v) => v.label === e.label)
  //   if (find) {
  //     const newValues = values.map((v) => {
  //       if (v.label === e.label) {
  //         return {
  //           ...v,
  //           value: e.value,
  //         }
  //       }
  //       return v
  //     })
  //     setValues(newValues)
  //     return
  //   } else {
  //     setValues([
  //       ...values,
  //       {
  //         value: e.value,
  //         label: e.label,
  //       },
  //     ])
  //   }
  // }

  useEffect(() => {
    if (state.status === 'error' && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    return () => {
      setTimeout(() => {
        action(new FormData())
      }, 4000)
    }
  }, [state.status])

  return (
    <form
      // onSubmit={onSubmit}
      action={action}
      className='max-w-xl mx-auto  border dark:border-slate-600 dark:bg-slate-900 p-12 rounded-lg'
    >
      <Fieldset className='space-y-4'>
        {fields.map((field) => (
          <FormRenderer
            key={field.id}
            field={field}
            onChange={(e) => {
              onChangeValue({
                label: field.label,
                value: e.target.value,
              })
              // setValues([
              //   ...values,
              //   {
              //     value: e.target.value,
              //     label: field.label,
              //   },
              // ])
            }}
          />
        ))}
      </Fieldset>
      <button
        type='submit'
        className='mt-4 text-lg font-medium w-full bg-primary-800 text-white mt-12 rounded-lg py-2 px-4 disabled:bg-gray-300 disabled:text-gray-500'
        disabled={!disabled}
      >
        Submit
      </button>
      <div
        ref={messageRef}
        className={cn(
          'text-lg font-medium dark:text-white w-full mt-4 p-6 transition-all ease-in-out duration-300 rounded-lg',
          state.status === 'error' && 'text-red-800 bg-red-200',
          state.status === 'success' && 'text-green-800 bg-green-100'
        )}
      >
        {state.message}
      </div>
    </form>
  )
}
const FormRenderer = ({
  field,
  onChange,
  isInvalid,
}: {
  field: FormField
  onChange?: (e: {
    target: {
      name: string
      value: string
    }
  }) => void
  isInvalid?: number
}) => {
  switch (field.type) {
    case 'text':
      return (
        <Field>
          <Label
            className={cn(
              'text-lg font-medium dark:text-white',
              field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {field.label}
          </Label>
          <Input
            type='text'
            required={field.required}
            invalid={isInvalid === 1 ? true : false}
            name={field.label.toLowerCase().replace(/ /g, '_')}
            onChange={(e) => {
              if (onChange) {
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: field.label.toLowerCase().replace(/ /g, '_'),
                    value: e.target.value,
                  },
                })
              }
            }}
            className={cn(
              'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
              'focus:outline-none  data-[focus]:outline-2 data-[focus]:-outline-offset-2  data-[invalid]:outline-red-700 '
            )}
          />
        </Field>
      )
    case 'textarea':
      return (
        <Field>
          <Label
            className={cn(
              'text-lg font-medium dark:text-white',
              field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {field.label}
          </Label>
          <Textarea
            name={field.label.toLowerCase().replace(/ /g, '_')}
            required={field.required}
            invalid={isInvalid && isInvalid === 1 ? true : false}
            className={cn(
              'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-700/45'
            )}
            onChange={(e) => {
              if (onChange) {
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: field.label.toLowerCase().replace(/ /g, '_'),
                    value: e.target.value,
                  },
                })
              }
            }}
          ></Textarea>
        </Field>
      )
    case 'number':
      return (
        <Field>
          <Label
            className={cn(
              'text-lg font-medium dark:text-white',
              field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {field.label}
          </Label>
          <Input
            type='number'
            required={field.required}
            invalid={isInvalid && isInvalid === 1 ? true : false}
            data-invalid={isInvalid === 1 ? true : false}
            name={field.label.toLowerCase().replace(/ /g, '_')}
            onChange={(e) => {
              if (onChange) {
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: field.label.toLowerCase().replace(/ /g, '_'),
                    value: e.target.value,
                  },
                })
              }
            }}
            className={cn(
              'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:dark:text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-700/45'
            )}
          />
        </Field>
      )
    case 'email':
      return (
        <Field>
          <Label
            className={cn(
              'text-lg font-medium dark:text-white',
              field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {field.label}
          </Label>
          <Input
            type='email'
            required={field.required}
            name={field.label.toLowerCase().replace(/ /g, '_')}
            onChange={(e) => {
              if (onChange) {
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: field.label.toLowerCase().replace(/ /g, '_'),
                    value: e.target.value,
                  },
                })
              }
            }}
            className={cn(
              'mt-3 block w-full rounded-lg border-none dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
              'focus:outline-none  data-[focus]:outline-2 data-[focus]:-outline-offset-2  data-[invalid]:outline-red-700 '
            )}
          />
        </Field>
      )
    case 'dropdown': {
      if (!field.options.data) {
        return null
      }
      return (
        <Field>
          <Label
            className={cn(
              'text-lg font-medium dark:text-white',
              field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {field.label}
          </Label>

          <div className='relative'>
            <Select
              className={cn(
                'mt-3 block w-full appearance-none rounded-lg border-none  dark:bg-white/5 bg-gray-100 py-1.5 px-3 text-lg dark:text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-700/45'
              )}
              name={field.label.toLowerCase().replace(/ /g, '_')}
              required={field.required}
              onChange={(e) => {
                if (onChange) {
                  onChange({
                    target: {
                      name: field.label.toLowerCase().replace(/ /g, '_'),
                      value: e.target.value,
                    },
                  })
                }
              }}
            >
              {field.options?.data?.map((option) => (
                <option
                  className='dark:dark:bg-slate-800'
                  key={option.id}
                  value={option.attributes.option}
                >
                  {option.attributes.option}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60'
              aria-hidden='true'
            />
          </div>
        </Field>
      )
    }
    case 'checkbox': {
      if (!field.options.data) {
        return null
      }
      return (
        <Field aria-required={field.required}>
          <Label className='text-lg font-medium dark:text-white'>
            {field.label}
          </Label>

          <div className='relative'>
            {field.options.data?.map((option) => (
              <div className='flex gap-2 items-center' key={option.id}>
                <Checkbox
                  defaultChecked={false}
                  className='group block size-4 rounded border bg-white data-[checked]:bg-primary-800'
                >
                  <svg
                    className='stroke-white opacity-0 group-data-[checked]:opacity-100'
                    viewBox='0 0 14 14'
                    fill='none'
                  >
                    <path
                      d='M3 8L6 11L11 3.5'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Checkbox>
                {option.attributes.option}
              </div>
            ))}
          </div>
        </Field>
      )
    }

    default:
      return null
  }
}

export default FormView
