"use client"

import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ComponentType, DataType } from '../types'
import { isUserAuthenticated } from '../utility/auth'
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  componentType: ComponentType
}

const ListComponent:React.FC<Props> = ({ componentType }) => {
	// const [projects, setProjects] = useState<DataType[]>([])
	const [data, setData] = useState<DataType[]>([])

	const router = useRouter()

	useEffect(() => {
		fetchApiData()
	}, [])

	async function fetchApiData() {
		try {
			const response = await fetch(
				'/api/projects'
				// 'http://localhost:8080/api/rest/get-projects'
			)
			// const apiData = await fetch('/api/getProjects')

			const apiData = await response.json()
			console.log('projectData:', apiData)

			if (apiData && apiData.data.projects) {
				// console.log('projectData', projectData.data.listProjects.items)
				setData(apiData.data.projects.reverse())
				// setData(apiData.data.projects)
			// } else if (data.certificates) {
			// 	setData(apiData.certificates.reverse())
			}
		} catch (e) {
			console.log('Error:', e)
		}

		// if (projectData && projectData.data) {
		// 	console.log(projectData.data.listProjects.items)
		// }

		// setProjects(projectData.data.listProjects.items)
	}
	// console.log('projects', projects)

	async function deleteProject(id: string) {
		try {
			if (await isUserAuthenticated() === false) {
				toast.error('You need to be logged in as a admin to delete a project')
				return
			}
			// await API.graphql({
			// 	query: deleteProjectMutation,
			// 	variables: { input: { id } },
			// 	// authMode: 'AMAZON_COGNITO_USER_POOLS',
			// })
			// fetchProjects()
		} catch (e) {
			console.log('Error:', e)
		}
	}

	return (
		<div className='w-3/4 section min-w-max'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='uppercase border-b section-title'>{componentType}s</h1>
			{data &&
				data.map((d, i) => (
					<div
						key={i}
						className='flex flex-row items-center justify-between border-b'
					>
						<span className='pr-4 my-4 font-semibold'>
							{d.title}
						</span>
						<span>
							<button
								onClick={() => {
									console.log(`redirecting`, d)
									router.push(`/project/${d.id}`)
								}}
								// onClick={() => {}}
								className='px-2 py-1 mx-2 my-1 text-sm text-white rounded-2xl button-green'
							>
								View
							</button>
							<button
								className='px-2 py-1 mx-2 my-1 text-sm text-white rounded-2xl button-blue'
								// onClick={() => navigate(`/edit-project/${project.id}`)}
								onClick={() => {}}
							>
								Edit
							</button>
							<button
								className='px-2 py-1 mx-2 my-1 text-sm text-white rounded-2xl button-red'
								onClick={() => d.id && deleteProject(d.id)}
							>
								Delete
							</button>
						</span>
					</div>
				))}
		</div>
	)
}

export default ListComponent


// Note: Commenting this out because there seems to be an issue with passing props to server side component

// import { ComponentType, DataType } from '@/types'

// async function ListComponent({
// 	componentType,
// }: {
// 	componentType: any
// }) {
// 		let projects
// 		try {
// 			const response = await fetch(
// 				// '/api/projects'
// 				`http://{process.env.HASURA_SERVER_URL}/api/rest/projects`
// 			)
// 			// const apiData = await fetch('/api/getProjects')
// 			projects = await response.json()
// 			console.log('projects:', projects)
// 		} catch (e) {
// 			console.log('Error:', e)
// 		}

// 		if (!projects || projects.length === 0) return (
// 			<div className='section'>
// 				<h1 className='text-3xl text-gray-500'>No Project Found</h1>
// 			</div>
// 		)
// 		return (<div>
// 			{projects.map((project: DataType) => (
// 				<div className='section'>
// 					{project.title}
// 				</div>
// 			))}
// 		</div>)
// }

// export default ListComponent as any as () => JSX.Element