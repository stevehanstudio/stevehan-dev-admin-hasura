"use client"

// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { API } from 'aws-amplify'
// import GraphQLAPI from '@aws-amplify/api-graphql'
// import * as graphQlApi from '../graphql/API'
// import { GraphQLQuery } from '@aws-amplify/api'
// import { listProjects } from '../graphql/queries'
// import { deleteProject as deleteProjectMutation } from '../graphql/mutations'
// import { DataType } from '../types'
import ListComponent from '@/components/ListComponent ssr'

const Projects = () => {
	return (
		<ListComponent componentType='project' />
	)
}

// const Projects = () => {
// 	// const [projects, setProjects] = useState<DataType[]>([])
// 	const [projects, setProjects] = useState<DataType[]>([])
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		fetchProjects()
// 	}, [])

// 	async function fetchProjects() {
// 		try {
// 			// const projectData = await API.graphql<GraphQLQuery<typeof listProjects>>({
// 			// 	query: listProjects
// 			// })
// 			const projectData = await API.graphql({
// 				query: listProjects
// 			// }) as { data: {listProjects: {items: GraphQLAPI.DataType[]}}}
// 			}) as { data: {listProjects: {items: DataType[]}}}

// 			if (projectData.data) {
// 				// console.log('projectData', projectData.data.listProjects.items)
// 				setProjects(projectData.data.listProjects.items)
// 			}
// 		} catch (e) {
// 			console.log('Error:', e)
// 		}

// 		// if (projectData && projectData.data) {
// 		// 	console.log(projectData.data.listProjects.items)
// 		// }

// 		// setProjects(projectData.data.listProjects.items)
// 	}
// 	console.log('projects', projects)

// 	async function deleteProject(id:string) {
// 		try {
// 			await API.graphql({
// 				query: deleteProjectMutation,
// 				variables: { input: { id }},
// 			})
// 			fetchProjects()
// 		} catch (e) {
// 			console.log("Error:", e)
// 		}
// 	}

// 	return (
// 		<div className='w-3/4 section min-w-max'>
// 			<h1 className='border-b section-title'>Projects</h1>
// 			{projects &&
// 				projects.map((project, i) => (
// 					<div
// 						key={i}
// 						className='flex flex-row items-center justify-between border-b'
// 					>
// 						<span className='pr-4 my-4 font-semibold'>
// 							{project.title}
// 						</span>
// 						<span>
// 							<button
// 								onClick={() => navigate(`/project/${project.id}`)}
// 								className='px-2 py-1 mx-2 my-1 text-sm text-white rounded-2xl button-green'
// 							>
// 								View
// 							</button>
// 							<button
// 								className='px-2 py-1 mx-2 my-1 text-sm text-white rounded-2xl button-blue'
// 								onClick={() => navigate(`/edit-project/${project.id}`)}
// 							>
// 								Edit
// 							</button>
// 							<button
// 								className='px-2 py-1 mx-2 my-1 text-sm text-white rounded-2xl button-red'
// 								onClick={() => deleteProject(project.id)}
// 							>
// 								Delete
// 							</button>
// 						</span>
// 					</div>
// 				))}
// 		</div>
// 	)
// }

export default Projects
