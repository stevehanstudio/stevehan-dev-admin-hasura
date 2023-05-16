import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

const Home = () => {
	return (
		<div className='section'>
			<p className='max-w-2xl mt-6'>
				Welcome to the admin panel to manage the content for my portfolio
				website. You can navigate and view the projects and certificates,
				but in order to create, update, and delete, you would need to be
				logged in and authenticated.
			</p>
		</div>
	)
}

export default withAuthenticator(Home)
