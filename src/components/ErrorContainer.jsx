export function ErrorContainer ({ error }) {
  return (
    <div className='flex flex-col justify-center gap-6 flex-1 items-center justify-centertext
		 text-red-400 text-xl'
    >
      <svg className='size-16 text-red-500'>
        <use href='/sprite.svg#warning' />
      </svg>
      <p>{error}</p>
    </div>
  )
}
