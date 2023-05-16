"use client"

import React, { FormEvent, useState } from 'react'
// import { API } from 'aws-amplify'
// import { v4 as uuid } from 'uuid'
import { useAuth } from "@clerk/nextjs"
import DatePicker from 'react-datepicker'
import toast, { Toaster } from 'react-hot-toast'
// import { createProject } from '../graphql/mutations'
import { DataType } from '@/types'
// import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { isUserAuthenticated } from '@/utility/auth'
import { useRouter } from 'next/navigation'
// import { format } from 'date-fns'

const initialState: DataType = {
	id: '',
	title: '',
	subtitle: '',
	slug: '',
	image: '',
	date: new Date().toISOString(),
	skills: [],
	website: undefined,
	github: undefined,
}

const CreateProject = () => {
	const [project, setProject] = useState<DataType>(initialState)
	// const navigate = useNavigate()
  const router = useRouter()
  const { userId, sessionId, getToken } = useAuth()

  function onChange(e: FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement
		if (target) {
			setProject(() => ({
				...project,
				[target.name]: target.value,
			}))
		}
	}

	async function createNewProject() {
		// "use server"
		console.log('Project to create', project)

		if (!project.title) return
		// const id = uuid()
		// project.id = id
		// project.date = Date.parse(project.date)
		delete project.id
		delete project.date
		try {
			console.log(
				'userId:',
				userId,
				', sessionId:',
				sessionId,
				', getToken:',
				await getToken()
			)
			const hasuraToken = getToken()
			if (!hasuraToken) {
				toast.error(
					'You need to be logged in as an admin to create a project'
				)
				return
			}
			console.log('hasuraToken', hasuraToken)
			console.log(
				'${process.env.NEXT_PUBLIC_HASURA_SERVER_URL}',
				process.env.NEXT_PUBLIC_HASURA_SERVER_URL
			)

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_HASURA_SERVER_URL}/api/rest/project`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `bearer ${hasuraToken}`,
						// 'x-hasura-admin-secret':
						// 	process.env.HASURA_GRAPHQL_ADMIN_SECRET || '',
						'x-hasura-role': 'admin',
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify(project),
				}
			)
			const data = await res.json()

			// const data = await fetch(`/api/create-project`, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 		'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || "",
			// 	},
			// 	body: JSON.stringify(project),
			// })
			console.log('data', data)

			// await API.graphql({
			// 	query: createProject,
			// 	variables: { input: project },
			// 	// authMode: 'AMAZON_COGNITO_USER_POOLS',
			// })
			// navigate(`/projects/${project.id}`)

			router.push(`/projects/${project.id}`)
		} catch (e) {
			console.log('Error:', e)
			toast.error('Error creating project')
		}
	}

	const handleDateChange = (date: Date | null) => {
		// console.log('Date', date)
		if (date) {
			// setSelectedDate(date)
			const dateString = date.toISOString()
			// console.log('dateString', dateString)
			// console.log('Date object again', new Date(dateString))
			setProject({
				...project,
				date: date.toISOString(),
			})
		}
	}

	// console.log(project)
	return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Create Project</h1>
			<form className='flex flex-col'>
				<div className='input-fields'>
					<label htmlFor='title'>Title</label>
					<input onChange={onChange} name='title' value={project.title} />
				</div>
				<div className='input-fields'>
					<label htmlFor='subtitle'>Subtitle</label>
					<input
						onChange={onChange}
						name='subtitle'
						value={project.subtitle}
					/>
				</div>
				<div className='input-fields'>
					<label htmlFor='slug'>Slug</label>
					<input onChange={onChange} name='slug' value={project.slug} />
				</div>
				<div className='input-fields'>
					<label htmlFor='image'>Image URL</label>
					<input onChange={onChange} name='image' value={project.image} />
				</div>
				<div className='input-fields'>
					<label htmlFor='date'>Date</label>
					<DatePicker
						selected={project.date ? new Date(project.date) : null}
						onChange={date => handleDateChange(date)}
					/>
				</div>
				<div className='input-fields'>
					<label htmlFor='website'>Live Website URL</label>
					<input
						onChange={onChange}
						name='website'
						value={project.website}
					/>
				</div>
				<div className='input-fields'>
					<label htmlFor='github'>Github Page URL</label>
					<input
						onChange={onChange}
						name='github'
						value={project.github}
					/>
				</div>
				<button
					type='button'
					className='mt-8 mb-4 button-lg button-blue'
					onClick={createNewProject}
				>
					Create Project
				</button>
			</form>
		</div>
	)
}

export default CreateProject
