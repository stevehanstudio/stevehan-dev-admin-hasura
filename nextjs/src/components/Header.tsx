"use client"

import React, { useState, useEffect, MouseEvent } from 'react'
import Link from 'next/link'
import { useClerk, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const Header = () => {
  // const [signedUser, setSignedUser] = useState(false)
	const router = useRouter()
	const { isLoaded, userId } = useAuth()
	const { signOut } = useClerk()

	const signedUser = isLoaded && userId

	// useEffect(() => {
	// 	authListener()
  // }, [])

  return (
		<div className='flex flex-row justify-between px-2 py-3 w-full bg-[#2C3E50] text-white absolute top-0 left-0 align-bottom'>
			<Toaster position='top-right' reverseOrder={false} />
			<Link href='/' className='flex flex-row align-bottom flex-start'>
				<img
					src='/stevehandev.png'
					className='ml-2 my-1 w-[30px] h-[30px]'
					alt='logo emblem'
				/>
				<div className='pl-1 text-center logo-text'>STEVE HAN</div>
				<div className='flex items-center justify-center mt-1 text-2xl font-thin tracking-tighter'>
					.dev
				</div>
				<div className='flex items-center justify-center pl-3 text-3xl font-thin'>
					Admin
				</div>
			</Link>
			<button
				className='mt-1 mr-4 text-xl text-gray-300 hover:text-white'
				onClick={() => {
					if (signedUser) {
						signOut()
						toast.success('You are logged out')
					} else {
						router.push('/login')
					}
				}}
			>
				{signedUser ? 'Logout' : 'Login'}
			</button>
		</div>
  )
}

export default Header