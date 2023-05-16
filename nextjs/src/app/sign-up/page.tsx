import React, { useState, FormEvent, MouseEvent } from 'react'

const SignUpPage = () => {
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
				Unfortunately you are not able to sign up as an admin.
			</p>
		</div>
	)
}

export default SignUpPage
