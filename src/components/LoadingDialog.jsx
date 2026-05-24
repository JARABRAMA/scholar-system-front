import { Spinner } from './Spinner'

export function LoadingDialog ({ ref }) {
  return (
    <dialog className='self-center justify-self-center rounded-xl' ref={ref}>
      <div className='flex items-center justify-center p-8'>
        <Spinner />
      </div>
    </dialog>
  )
}
