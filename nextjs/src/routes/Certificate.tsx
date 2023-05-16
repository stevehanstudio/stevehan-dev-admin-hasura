import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from 'aws-amplify'
import toast, { Toaster } from 'react-hot-toast'
import { RiDeleteBinLine, RiEdit2Fill } from 'react-icons/ri'
import { getCertificate } from '../graphql/queries'
import { deleteCertificate as deleteCertificateMutation } from '../graphql/mutations'
import { DataType } from '../types'
import { isUserAuthenticated } from '../utility/auth'

const Certificate = () => {
  const [certificate, setCertificate] = useState<DataType>()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchCertificate(id)
    }
  }, [id])

  async function fetchCertificate(id: String) {
    try {
      const certificateData = (await API.graphql({
        query: getCertificate,
        variables: { id },
      })) as { data: { getCertificate: DataType } }
      console.log('id', certificateData.data.getCertificate)
      if (certificateData.data) {
        setCertificate(certificateData.data.getCertificate)
      }
    } catch (e) {
      console.log('Error:', e)
    }
  }

  async function deleteCertificate(id: String) {
    try {
      if (await isUserAuthenticated() === false) {
        toast.error('You need to be logged in as a admin to delete a certificate')
        return
      }
      await API.graphql({
        query: deleteCertificateMutation,
        variables: { input: { id } },
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      fetchCertificate(id)
    } catch (e) {
    }
  }

  console.log('Certificate!', certificate, id)
  if (!certificate) return <div>Certificate not found</div>

  return (
		<div className='section'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='section-title'>Certificate</h1>
			<div className='flex flex-row justify-end'>
				<button
					className='text-gray-700 hover:bg-green-400 hover:text-white rounded-full p-2 mr-3'
					onClick={() => navigate(`/edit-certificate/${certificate.id}`)}
				>
					<RiEdit2Fill size={20} />
				</button>
				<button
					className='text-gray-700 hover:bg-red-400 hover:text-white rounded-full p-2'
					onClick={() => deleteCertificate(certificate.id)}
				>
					<RiDeleteBinLine size={20} />
				</button>
			</div>
			<img
				src={certificate.image}
				className='h-[200px] w-[250px] rounded-md'
				alt={certificate.title}
			/>
			<h2 className='text-xl font-semibold mt-4 mb-2'>{certificate.title}</h2>
			<p className=' leading-relaxed'>{certificate.subtitle}</p>
			<div className='mt-10'>
				{certificate.curriculum && (
					<a
						href={certificate.curriculum}
						target='_BANK'
						rel='noopener noreferrer'
						className='button-sm button-blue mr-8 '
					>
						Curriculum
					</a>
				)}
				{certificate.credentials && (
					<a
						href={certificate.credentials}
						target='_BANK'
						rel='noopener noreferrer'
						className='button-sm button-emerald'
					>
						Credentials
					</a>
				)}
				{certificate.course && (
					<a
						href={certificate.course}
						target='_BANK'
						rel='noopener noreferrer'
						className='button-sm button-emerald'
					>
						Course
					</a>
				)}
			</div>
		</div>
  )
}

export default Certificate