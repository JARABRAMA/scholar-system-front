import { captalize } from '../../utils/captalize'

export function ScheduleItem ({ day, startTime, endTime, className = '' }) {
  return (
    <div className={`flex gap-2 justify-between items-center pe-9 ${className}`}>
      <span className='flex text-stone-800 items-center gap-1'>
        <svg className='size-4'>
          <use href='/sprite.svg#calendar' />
        </svg>
        {captalize(day.toLowerCase())}
      </span>
      <div className='flex gap-1 text-stone-800 font-bold'>
        <span>{startTime.slice(0, 5)}</span>-<span>{endTime.slice(0, 5)}</span>
      </div>
    </div>
  )
}
