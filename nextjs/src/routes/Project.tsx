import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { API } from 'aws-amplify'
import toast, { Toaster } from 'react-hot-toast'
import { RiDeleteBinLine, RiEdit2Fill } from 'react-icons/ri'
// import { getProject } from '../graphql/queries'
// import { deleteProject as deleteProjectMutation } from '../graphql/mutations'
import { DataType } from '../types'
import { isUserAuthenticated } from '../utility/auth'

const Project = () => {
  const [project, setProject] = useState<DataType>()
  // const navigate = useNavigate()
  // const { id } = useParams()

  // useEffect(() => {
  //   if (id) {
  //     fetchProject(id)
  //   }
  // }, [id])

  async function fetchProject(id: String) {
    try {
      // const projectData = (await API.graphql({
      //   query: getProject,
      //   variables: { id },
      // })) as { data: { getProject: DataType } }
      // console.log('id', projectData.data.getProject)
      // if (projectData.data) {
      //   setProject(projectData.data.getProject)
      // }
			const projectData = await fetch("/api/")
    } catch (e) {
      console.log('Error:', e)
    }
  }

  async function deleteProject(id: String) {
    try {
      if (await isUserAuthenticated() === false) {
        toast.error('You need to be logged in as a admin to delete a project')
        return
      }
      // await API.graphql({
      //   query: deleteProjectMutation,
      //   variables: { input: { id } },
      //   // authMode: 'AMAZON_COGNITO_USER_POOLS',
      // })
      fetchProject(id)
    } catch (e) {
    }
  }

  // console.log('Project!', project, id)
  if (!project) return <div>Project not found</div>

  return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Project</h1>
			<div className='flex flex-row justify-end'>
				<button
					className='p-2 mr-3 text-gray-700 rounded-full hover:bg-green-400 hover:text-white'
					onClick={() => {}}
					// onClick={() => navigate(`/edit-project/${project.id}`)}
				>
					<RiEdit2Fill size={20} />
				</button>
				<button
					className='p-2 text-gray-700 rounded-full hover:bg-red-400 hover:text-white'
					onClick={() => deleteProject(project.id)}
				>
					<RiDeleteBinLine size={20} />
				</button>
			</div>
			<img
				src={project.image}
				className='h-[200px] w-[250px] rounded-md'
				alt={project.title}
			/>
			<h2 className='mt-4 mb-2 text-xl font-semibold'>{project.title}</h2>
			<p className='leading-relaxed '>{project.subtitle}</p>
			<div className='mt-10'>
				{project.website && (
					<a
						href={project.website}
						target='_BANK'
						rel='noopener noreferrer'
						className='mr-8 button-sm button-blue '
					>
						Live Demo
					</a>
				)}
				{project.github && (
					<a
						href={project.github}
						target='_BANK'
						rel='noopener noreferrer'
						className='button-sm button-emerald'
					>
						Github
					</a>
				)}
			</div>
		</div>
  )
}

export default Project