import React from 'react'
import { ComponentType } from '../types'

interface Props {
	componentType: ComponentType
}

const DownloadButton: React.FC<Props> = ({ componentType }) => {
	const downloadFile = () => {
    if (componentType === 'project') {
			window.location.href = `https://raw.githubusercontent.com/stevehanstudio/stevehan.dev-framer-motion/main/public/projects.json`
    } else {
			window.location.href = `https://raw.githubusercontent.com/stevehanstudio/stevehan.dev-framer-motion/main/public/certificates.json`
    }
	}
	return <button className='button-lg button-blue' onClick={downloadFile}>Download File</button>
}

const Download:React.FC<Props> = ({ componentType }) => {
  return (
		<div className='section'>
			<h1 className='section-title'>
				Download{' '}
				{componentType.charAt(0).toUpperCase() + componentType.slice(1)}s
			</h1>
			<div className='w-full max-w-lg flex flex-col mt-10 mx-auto p-16 rounded-lg border-2 border-gray-200'>
				<p className='text-gray-600'>
					Download all {componentType}s as a JSON file. Currently reading
					from the actual database have't been implemented yet.
				</p>
				<div className='flex flex-row mt-8'>
					<DownloadButton componentType={componentType}/>
				</div>
			</div>
		</div>
  )
}

export default Download