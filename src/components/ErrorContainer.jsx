export function ErrorContainer ({ error }) {
  return (
    <div className='flex flex-col justify-center gap-6 flex-1 items-center justify-centertext
		 text-xl'
    >

      <h2 className='text-2xl font-bold text-red-500 flex flex-col items-center'>
        <svg className='size-16 text-red-500'>
          <use href='/sprite.svg#warning' />
        </svg>
        Error
      </h2>
      <p className='text-stone-800'>{error}</p>
    </div>
  )
}
