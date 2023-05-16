import React, { useEffect, useState, FormEvent } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { API } from 'aws-amplify'
import ReactDatePicker from 'react-datepicker'
// import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'
// import { updateProject } from '../graphql/mutations'
import { DataType } from '../types'
// import { getProject } from '../graphql/queries'
import 'react-datepicker/dist/react-datepicker.css'
import { isUserAuthenticated } from '../utility/auth'

const EditProject = () => {
  const [project, setProject] = useState<DataType>()
  // const navigate = useNavigate()
  // const { id } = useParams()

  // useEffect(() => {
	// 	async function fetchProject(id: String) {
	// 		try {
	// 			// const projectData = (await API.graphql({
	// 			// 	query: getProject,
	// 			// 	variables: { id },
	// 			// })) as { data: { getProject: DataType } }
	// 			// console.log('id', projectData.data.getProject)
	// 			// if (projectData.data) {
	// 			// 	setProject(projectData.data.getProject)
	// 			// }
	// 		} catch (e) {
	// 			console.log('Error:', e)
	// 		}
	// 	}

	// 	if (id) {
	// 		fetchProject(id)
	// 	}
  // }, [id])

	function onChange(e: FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement
		if (target && project) {
			setProject(() => ({
				...project,
				[target.name]: target.value,
			}))
		}
	}

	async function updateCurrentProject() {
		if (!project) return
		// const id = uuid()
		// project.id = id

    const {title, subtitle, image, date, website, github } = project
    const projectUpdated = {
      // id,
      title,
      subtitle,
      image,
			date,
      website,
      github
    }

    try {
			if ((await isUserAuthenticated()) === false) {
				toast.error('You need to be logged in as a admin to update a project')
				return
			}
      // await API.graphql({
			// query: updateProject,
			// variables: { input: projectUpdated },
			// authMode: 'AMAZON_COGNITO_USER_POOLS',
		// })
      // navigate(`/project/${project.id}`)
    } catch (e) {
      console.log("Error:", e)
    }
	}

	const handleDateChange = (date: Date | null) => {
		console.log('Date', date)
		if (date && project) {
			// setSelectedDate(date)
			setProject({
				...project,
				date: date.toISOString(),
			})
		}
	}

	if (!project) return <div>Project not found</div>

	console.log(project)
	return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Edit Project</h1>
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
					<img
						src={project.image}
						alt={project.title}
						className='h-[80px] w-[110px] mt-1 rounded-md'
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='date'>Date</label>
					<ReactDatePicker
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
					className='mt-8 mb-4 button-lg button-green'
					onClick={updateCurrentProject}
				>
					Update Project
				</button>
			</form>
		</div>
	)
}

export default EditProject
