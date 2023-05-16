import React, { FormEvent, useState } from 'react'
import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import DatePicker from 'react-datepicker'
import toast, { Toaster } from 'react-hot-toast'
import { createCertificate } from '../graphql/mutations'
import { DataType } from '../types'
import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { isUserAuthenticated } from '../utility/auth'
// import { format } from 'date-fns'

const initialState: DataType = {
  id: '',
  title: '',
	subtitle: '',
	slug: '',
	image: '',
	organization: '',
	date: (new Date()).toISOString(),
	skills: [],
	credentials: undefined,
	curriculum: undefined,
	course: undefined
}

const CreateCertificate = () => {
  const [certificate, setCertificate] = useState<DataType>(initialState)
	const navigate = useNavigate()

  function onChange(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement
    if (target) {
      setCertificate(() => ({
        ...certificate,
        [target.name]: target.value,
      }))
    }
  }

  async function createNewCertificate() {
		// console.log('Certificate to create', certificate)
		if (!certificate.title) return
    const id = uuid()
    certificate.id = id
		// certificate.date = Date.parse(certificate.date)
    try {
			if ((await isUserAuthenticated()) === false) {
				toast.error('You need to be logged in as an admin to update a certificate')
				return
			}
			await API.graphql({
				query: createCertificate,
				variables: { input: certificate },
				// authMode: 'AMAZON_COGNITO_USER_POOLS',
			})
			navigate(`/certificates/${certificate.id}`)
		} catch (e) {
			console.log("Error:", e)
		}
  }

	const handleDateChange = (date: (Date |null)) => {
		// console.log('Date', date)
		if (date) {
			// setSelectedDate(date)
			// const dateString = date.toISOString()
			// console.log('dateString', dateString)
			// console.log('Date object again', new Date(dateString))
			setCertificate({
				...certificate,
				date: date.toISOString(),
			})
		}
	}

	console.log(certificate)
  return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Create Certificate</h1>
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
				</div>
				<div className='input-fields'>
					<label htmlFor='date'>Date</label>
					<DatePicker
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
				</div>{' '}
				<button
					type='button'
					className='mt-8 mb-4 button-lg button-blue'
					onClick={createNewCertificate}
				>
					Create Certificate
				</button>
			</form>
		</div>
  )
}

export default CreateCertificate