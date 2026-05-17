export function ErrorContainer({error}) {
	return (
		<div className='flex flex-col flex-1 items-center justify-center
			text-red-400'>
			<svg className='size-16'>
				<use href='/sprite.svg#waring'/>
			</svg>
			<p>{error}</p>
		</div>
	)
}