export function HeaderForm ({ title, description }) {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-stone-600'>{description}</p>
    </div>
  )
}
