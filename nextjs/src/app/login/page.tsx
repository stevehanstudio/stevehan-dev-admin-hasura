import React, { useState, FormEvent, MouseEvent } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Auth } from 'aws-amplify'
import { SignIn } from '@clerk/nextjs'

const Login = () => {
	// const [username, setUsername] = useState('')
	// const [password, setPassword] = useState('')
	// const navigate = useNavigate()

	// const onUsernameChange = (e: FormEvent<HTMLInputElement>) => {
	// 	const target = e.target as HTMLInputElement
	// 	if (target) {
	// 		setUsername(target.value)
	// 	}
	// }

	// const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
	// 	const target = e.target as HTMLInputElement
	// 	if (target) {
	// 		setPassword(target.value)
	// 	}
	// }

	// async function signIn(e: MouseEvent<HTMLButtonElement>) {
	// 	e.preventDefault()
	// 	try {
	// 		// const user = await Auth.signIn(username, password)
	// 		// console.log('user:', user)
	// 		// navigate('/')
	// 	} catch (error) {
	// 		console.log('error signing in', error)
	// 	}
	// }

	return (
		<div className='section'>
			<p className='max-w-2xl pb-4 my-6'>
				This page is meant for me to log in with my admin crendentials.
			</p>
			{/* <SignIn signUpUrl='/sign-up' /> */}
			<SignIn redirectUrl='/' />
		</div>
	)
}

export default Login

// import { redirect } from 'next/navigation'

// export async function GET(request: Request) {
// 	redirect('https://nextjs.org/')
// }