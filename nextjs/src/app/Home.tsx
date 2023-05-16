const Home = () => {
	return (
		<div className='section'>
			<p className='max-w-xl mt-8 mb-6 text-lg leading-loose'>
				Welcome to the admin panel to manage the content of my portfolio
				website,{' '}
				<a
					className='text-blue-600  hover:underline hover:text-blue-500'
					href='https://stevehan.dev'
					target='_blank'
					rel='noopener noreferrer'
				>
					stevehan.dev
				</a>
				. You may navigate to and view all the pages of this web app, but only I am able to
				complete the create, update, and delete operations upon logging in with my admin credentials.
			</p>
		</div>
	)
}

export default Home
