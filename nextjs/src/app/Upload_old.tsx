import { API } from 'aws-amplify'
import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'
import { createCertificate, createProject } from '../graphql/mutations'
import { JSONValue, ComponentType, DataType } from '../types'
import { isUserAuthenticated } from '../utility/auth'

interface Props {
	componentType: ComponentType
}

// Convert ArrayBuffer to string
function ab2str(buf: ArrayBuffer) {
	return String.fromCharCode.apply(null, new Uint16Array(buf) as any)
}

const Upload: React.FC<Props> = ({ componentType }) => {
	const [data, setData] = useState<JSONValue>({})
	const [fileName, setFileName] = useState<string | null>(null)
	const [fileError, setFileError] = useState(false)
	const hiddenFileInput = useRef(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (fileName) {
			fetch(fileName, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then((response: Response) => response.json())
				.then((result: JSONValue) => {
					// console.log('Setting', result)
					setData(result)
				})
				.catch(err => {
					console.log('Problem reading json data', err)
					setFileError(true)
				})
		}
	}, [fileName])

	useEffect(() => {
		const uploadData = async () => {
			try {
				if ((await isUserAuthenticated()) === false) {
					toast.error(
						`You need to be logged in as an admin to create ${componentType}s`
					)
					return
				}

				for (const [key, value] of Object.entries(data)) {
					value.id = key
					// console.log('project', value)
					value.skills = []
					createNewUploadData(value)
				}
				toast.success('Upload completed!')
				navigate(`/${componentType}s`)
			} catch (e) {
				console.log('Error:', e)
			}
		}

		async function createNewUploadData(dataObj: DataType) {
			// project.date = Date.parse(project.date)
			try {
				if (!dataObj.title) return
				// const id = uuid()
				// project.id = id
				await API.graphql({
					query:
						componentType === 'project'
							? createProject
							: createCertificate,
					variables: { input: dataObj },
					// authMode: 'AMAZON_COGNITO_USER_POOLS',
				})
			} catch (e) {
				console.log('Error:', e)
			}
		}

		if (data && Object.keys(data).length !== 0) {
			console.log('Got data', data)
			uploadData()
		}
	}, [data, componentType, navigate])

	// Programatically click the hidden file input element
	// when the Button component is clicked
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (hiddenFileInput.current) {
			;(hiddenFileInput.current as HTMLInputElement).click()
		}
	}

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetFile = e.target.value
		const fileReader = new FileReader()
		if (!e.target.files) return
		// console.log(targetFile, fileReader)

		fileReader.readAsText(e.target.files[0], 'UTF-8')
		fileReader.onload = e => {
			if (!e.target) return
			const fileData =
				e.target.result instanceof ArrayBuffer
					? ab2str(e.target.result)
					: e.target.result
			try {
				if (!fileData) return
				setData(JSON.parse(fileData))
				setFileName(
					targetFile.substring(
						targetFile.lastIndexOf('\\') + 1,
						targetFile.length
					)
				)
			} catch (e) {
				setFileError(true)
			}
		}
	}

	// console.log('data', data)
	// console.log('fileName', fileName)

	return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>
				Upload{' '}
				{componentType.charAt(0).toUpperCase() + componentType.slice(1)}s
			</h1>
			<div className='flex flex-col w-full p-16 mx-auto mt-10 border-2 border-gray-200 rounded-lg'>
				<p className='text-gray-600'>
					Upload a {componentType}s file in JSON format
				</p>
				<div className='flex flex-row mt-8'>
					<button onClick={handleClick} className='button-lg button-blue'>
						Upload
					</button>
					<input
						ref={hiddenFileInput}
						type='file'
						onChange={onFileChange}
						className='hidden'
					/>
					<span className='p-4'>{fileName}</span>
				</div>
			</div>
		</div>
	)
}

export default Upload
