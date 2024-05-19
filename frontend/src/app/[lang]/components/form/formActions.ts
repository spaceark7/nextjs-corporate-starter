'use server'

type FormState = {
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function onFormPostAction(prevState: FormState, data: FormData) {
  // Process the data

  const payload = Object.fromEntries(data.entries())
  const datas = Object.entries(payload).map(([key, value]) => {
    return {
      key: key.replace(/_/g, ' '),
      value: value.toString(),
    }
  })
  const notValidEmail = datas.find((data) => {
    return data.key === 'email' && !emailRegex.test(data.value)
  })

  if (notValidEmail) {
    return {
      status: 'error',
      message: 'Please enter a valid email address',
    }
  } else if (datas.length === 0) {
    return {
      status: 'idle',
      message: '',
    }
  } else {
    return {
      status: 'success',
      message: 'Thank you for your submission!',
    }
  }
}
