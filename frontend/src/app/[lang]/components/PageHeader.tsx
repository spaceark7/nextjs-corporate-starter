interface PageHeaderProps {
  heading: string
  text?: string
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className='mt-16 w-full '>
      {text && <span className='text-violet-400 font-bold'>{text}</span>}
      <h2 className='text-4xl my-4 lg:text-5xl font-bold font-title font-heading'>
        {heading}
      </h2>
    </div>
  )
}
