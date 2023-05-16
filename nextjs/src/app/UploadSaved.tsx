import { API } from 'aws-amplify'
import React, { useState, useEffect, useRef, MouseEvent } from 'react'
// import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'
import { createProject } from '../graphql/mutations'
import { JSONValue, ComponentType, DataType } from '../types'
import { isUserAuthenticated } from '../utility/auth'

interface Props {
  componentType: ComponentType
}

// const convertArrayBufferToNumber = (buffer: ArrayBuffer) =>{
//   const bytes = new Uint8Array(buffer);
//   const dv = new DataView(bytes.buffer);
//   return dv.getUint16(0, true);
// }

// Convert ArrayBuffer to string
function ab2str(buf: ArrayBuffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buf) as any);
}

const Upload: React.FC<Props> = ({ componentType }) => {
	const [data, setData] = useState<JSONValue>({})
	const [fileName, setFileName] = useState<string | null>(null)
	const [fileError, setFileError] = useState(false)
	const hiddenFileInput = useRef(null)

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
					console.log('Setting', result)
					setData(result)
				})
				.catch(err => {
					console.log('Problem reading json data', err)
					setFileError(true)
				})
		}
	}, [fileName])

	useEffect(() => {
		const uploadProjects = async () => {
			try {
				if ((await isUserAuthenticated()) === false) {
					toast.error(
						'You need to be logged in as an admin to create projects'
					)
					return
				}
				// Object.values(data).forEach(project => {
				for (const [key, value] of Object.entries(data)) {
					value.id = key
					// console.log('project', value)
					value.skills = []
				 	createNewProject(value)
				}
			} catch (e) {
				console.log('Error:', e)
			}
		}

		async function createNewProject(project:DataType) {
			// project.date = Date.parse(project.date)
			try {
					if (!project.title) return
					// const id = uuid()
					// project.id = id
					await API.graphql({
						query: createProject,
						variables: { input: project },
						// authMode: 'AMAZON_COGNITO_USER_POOLS',
					})
			} catch (e) {
				console.log('Error:', e)
			}
		}

		if (data)
			uploadProjects()
	}, [data])


	// Programatically click the hidden file input element
	// when the Button component is clicked
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (hiddenFileInput.current) {
			(hiddenFileInput.current as HTMLInputElement).click()
		}
	}

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetFile = e.target.value
		const fileReader = new FileReader()
		if (!e.target.files) return
		console.log(targetFile, fileReader)

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

	console.log('data', data)
	console.log('fileName', fileName)

	return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Upload Projects</h1>
			{/* <button onClick={handle}>UPLOAD FILE</button> */}
			<div className='w-full flex flex-col mt-10 mx-auto p-16 rounded-lg border-2 border-gray-200'>
				<p className='text-gray-600'>
					Upload a projects file in JSON format
				</p>
				<div className='flex flex-row mt-8'>
					<button
						onClick={handleClick}
						className='rounded-lg px-5 py-2 text-md text-gray-400 hover:bg-blue-500 hover:text-white border-2 border-gray-300'
					>
						UPLOAD FILE
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