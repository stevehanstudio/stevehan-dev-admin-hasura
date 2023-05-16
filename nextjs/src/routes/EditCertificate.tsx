import React, { useEffect, useState, FormEvent } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { API } from 'aws-amplify'
import ReactDatePicker from 'react-datepicker'
// import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'
// import { updateCertificate } from '../graphql/mutations'
import { DataType } from '../types'
// import { getCertificate } from '../graphql/queries'
import 'react-datepicker/dist/react-datepicker.css'
import { isUserAuthenticated } from '../utility/auth'

const EditProject = () => {
  const [certificate, setCertificate] = useState<DataType>()
  // const navigate = useNavigate()
  // const { id } = useParams()

  // useEffect(() => {
	// 	async function fetchProject(id: String) {
	// 		try {
	// 			// const certificateData = (await API.graphql({
	// 			// 	query: getCertificate,
	// 			// 	variables: { id },
	// 			// })) as { data: { getCertificate: DataType } }
	// 			// console.log('id', certificateData.data.getCertificate)
	// 			// if (certificateData.data) {
	// 			// 	setCertificate(certificateData.data.getCertificate)
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
		if (target && certificate) {
			setCertificate(() => ({
				...certificate,
				[target.name]: target.value,
			}))
		}
	}

	async function updateCurrentProject() {
		if (!certificate) return
		// const id = uuid()
		// certificate.id = id

    const {
			title,
			subtitle,
			image,
			organization,
			date,
			curriculum,
			credentials,
			course,
		} = certificate
    const certificateUpdated = {
      id,
      title,
      subtitle,
      image,
			organization,
			date,
			curriculum,
      credentials,
      course
    }

    try {
		// 	if ((await isUserAuthenticated()) === false) {
		// 		toast.error('You need to be logged in as a admin to update a project')
		// 		return
		// 	}
    //   await API.graphql({
		// 	query: updateCertificate,
		// 	variables: { input: certificateUpdated },
		// 	// authMode: 'AMAZON_COGNITO_USER_POOLS',
		// })
    //   navigate(`/certificate/${certificate.id}`)
    } catch (e) {
      console.log("Error:", e)
    }
	}

	const handleDateChange = (date: Date | null) => {
		// console.log('Date', date)
		if (date && certificate) {
			// setSelectedDate(date)
			setCertificate({
				...certificate,
				date: date.toISOString(),
			})
		}
	}

	if (!certificate) return <div>Project not found</div>

	console.log(certificate)
	return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Edit Project</h1>
			<form className='flex flex-col'>
				<div className='input-fields'>
					<label htmlFor='title'>Title</label>
					<input
						onChange={onChange}
						name='title'
						value={certificate.title}
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='subtitle'>Subtitle</label>
					<input
						onChange={onChange}
						name='subtitle'
						value={certificate.subtitle}
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='slug'>Slug</label>
					<input
						onChange={onChange}
						name='slug'
						value={certificate.slug}
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='image'>Image URL</label>
					<input
						onChange={onChange}
						name='image'
						value={certificate.image}
					/>
					<img
						src={certificate.image}
						alt={certificate.title}
						className='h-[80px] w-[110px] mt-1 rounded-md'
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='date'>Date</label>
					<ReactDatePicker
						selected={
							certificate.date ? new Date(certificate.date) : null
						}
						onChange={date => handleDateChange(date)}
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='curriculum'>Curriculum URL</label>
					<input
						onChange={onChange}
						name='curriculum'
						value={certificate.curriculum}
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='credentials'>Credentials URL</label>
					<input
						onChange={onChange}
						name='credentials'
						value={certificate.credentials}
					/>
				</div>

				<div className='input-fields'>
					<label htmlFor='course'>Course URL</label>
					<input
						onChange={onChange}
						name='course'
						value={certificate.course}
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
