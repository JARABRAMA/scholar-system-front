export function FormErrorMessage ({ error }) {
  return (
    <>
      {error &&
        <p className='text-sm w-full text-center text-red-400'>{error}</p>}
    </>
  )
}
