// import toast, { Toaster } from 'react-hot-toast'
// import { RiDeleteBinLine, RiEdit2Fill } from 'react-icons/ri'
import { DataType } from '../../../types'

export default async function ProjectPage({ params }: { params: { id: string } }) {
	const res = await fetch(`${process.env.HASURA_SERVER_URL}/api/rest/project/${params.id}`)
	const data = await res.json()
	const project: DataType = data.projects_by_pk
	console.log('Data back', project)

	return (
		<div className='section'>
			<h1 className='text-4xl text-center'>{project.title}</h1>
			<div className='flex mt-10'>
				<img
					className='h-[275px]'
					src={project.image}
					alt={project.title}
				/>
				<p className='pl-10 text-xl'>{project.subtitle}</p>
			</div>
			<div className='flex items-center justify-center pt-10 mx-auto mt-12'>
				{project.website && (
					<a
						className='px-3 py-2 mr-10 text-base text-white rounded-lg cursor-pointer button-blue'
						href={project.website}
						target='_blank'
						rel='noopener noreferrer'
					>
						Live Website
					</a>
				)}
				{project.github && (
					<a
						className='px-3 py-2 text-base text-white rounded-lg cursor-pointer button-green'
						href={project.github}
						target='_blank'
						rel='noopener noreferrer'
					>
						Source Code
					</a>
				)}
			</div>
		</div>
	)
}

// "use client"

// import React, { useState, useEffect } from 'react'
// import toast, { Toaster } from 'react-hot-toast'
// import { RiDeleteBinLine, RiEdit2Fill } from 'react-icons/ri'
// import { DataType } from '../../../types'
// import { isUserAuthenticated } from '../../../utility/auth'

// const Project = ({ params }: { params: { id: string}}) => {
//   const [project, setProject] = useState<DataType>()

// 	const { id } = params
// 	// const project = getProject(id)
// 	console.log(`project with id ${id}`, project)

//   useEffect(() => {
// 		const fetchProject = async (id: string) => {
// 			try {
// 				console.log('getProject by ID', id)

// 				console.log(`Route = /api/project/${id}`)

// 				const res = await fetch(`/api/project/${id}`)
// 				const data = await res.json()
// 				console.log('setProject', data)

// 				// if (data)
// 				// setProject(data)
// 				// return data
// 			} catch (e) {
// 				console.log('Error:', e)
// 			}
// 		}

//     fetchProject(id)
//   }, [id])

//   // async function fetchProject(id: String) {
//   //   try {
//   //     console.log('id', projectData.data.getProject)
//   //     if (projectData.data) {
//   //       setProject(projectData.data.getProject)
//   //     }
// 	// 		const projectData = await fetch(`/api/project/${id}`)
// 	// 		console.log(projectData);

//   //   } catch (e) {
//   //     console.log('Error:', e)
//   //   }
//   // }

//   // async function deleteProject(id: String) {
//   //   try {
//   //     if (await isUserAuthenticated() === false) {
//   //       toast.error('You need to be logged in as a admin to delete a project')
//   //       return
//   //     }
//   //     // await API.graphql({
//   //     //   query: deleteProjectMutation,
//   //     //   variables: { input: { id } },
//   //     //   // authMode: 'AMAZON_COGNITO_USER_POOLS',
//   //     // })
//   //     fetchProject(id)
//   //   } catch (e) {
//   //   }
//   // }

//   // console.log('Project!', project, id)
//   if (!project) return <div>Project not found</div>

//   return (
// 		<div className='section'>
// 			<Toaster position='top-right' reverseOrder={false} />
// 			<h1 className='section-title'>Project</h1>
// 			<div className='flex flex-row justify-end'>
// 				<button
// 					className='p-2 mr-3 text-gray-700 rounded-full hover:bg-green-400 hover:text-white'
// 					onClick={() => {}}
// 					// onClick={() => navigate(`/edit-project/${project.id}`)}
// 				>
// 					<RiEdit2Fill size={20} />
// 				</button>
// 				<button
// 					className='p-2 text-gray-700 rounded-full hover:bg-red-400 hover:text-white'
// 					// onClick={() => deleteProject(project.id)}
// 				>
// 					<RiDeleteBinLine size={20} />
// 				</button>
// 			</div>
// 			<img
// 				src={project.image || ""}
// 				className='h-[200px] w-[250px] rounded-md'
// 				alt={project.title || ""}
// 			/>
// 			<h2 className='mt-4 mb-2 text-xl font-semibold'>{project.title}</h2>
// 			<p className='leading-relaxed '>{project.subtitle}</p>
// 			<div className='mt-10'>
// 				{project.website && (
// 					<a
// 						href={project.website}
// 						target='_BANK'
// 						rel='noopener noreferrer'
// 						className='mr-8 button-sm button-blue '
// 					>
// 						Live Demo
// 					</a>
// 				)}
// 				{project.github && (
// 					<a
// 						href={project.github}
// 						target='_BANK'
// 						rel='noopener noreferrer'
// 						className='button-sm button-emerald'
// 					>
// 						Github
// 					</a>
// 				)}
// 			</div>
// 		</div>
//   )
// }

// export default Project
