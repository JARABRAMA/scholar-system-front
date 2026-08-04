export function Pagination ({
  onPreviousPage,
  isFirstPage,
  pages,
  currentPage,
  onSetPage,
  onNextPage,
  isLastPage
}) {
  return (
    <div className='flex justify-center gap-2 mt-4'>
      <button
        onClick={onPreviousPage}
        disabled={isFirstPage}
        className={`flex items-center justify-center hover:ring-stone-600 rounded-xl size-10 hover:ring-2
           bg-blue-500 text-white  shadow-sm duration-300 active:scale-[.9] disabled:opacity-50 disabled:bg-white disabled:border disabled:text-black`}
      >
        <svg className='size-6'>
          <use href='/sprite.svg#navigate-previous' />
        </svg>
      </button>

      {pages.map((p) => (
        <button
          disabled={currentPage + 1 === p}
          key={p}
          onClick={() => onSetPage(p - 1)}
          className={`flex items-center hover:ring-2 justify-center  rounded-xl size-10
           bg-blue-500 text-white  shadow-sm duration-300 active:scale-[.9] disabled:opacity-50 disabled:bg-black
            disabled:hover:ring-2 ring-stone-800`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={onNextPage}
        disabled={isLastPage}
        className={`flex items-center hover:ring-2 hover:ring-stone-600 justify-center  rounded-xl size-10
           bg-blue-500 text-white  shadow-sm duration-300 active:scale-[.9] disabled:opacity-50 disabled:bg-white disabled:border disabled:text-black`}
      >
        <svg className='size-6'>
          <use href='/sprite.svg#navigate-next' />
        </svg>
      </button>
    </div>
  )
}
