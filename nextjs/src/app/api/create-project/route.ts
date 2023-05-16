import { useAuth } from '@clerk/nextjs';
// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!')
// }

import { DataType } from '@/types'
import { NextResponse } from 'next/server'

export async function POST(project: DataType) {
  console.log('CreateProject secret:', process.env.HASURA_GRAPHQL_ADMIN_SECRET)
	const { getToken } = useAuth()

	try {
		const hasuraToken = getToken()
		console.log('hasuraToken', hasuraToken)

		const res = await fetch(
			`${process.env.HASURA_SERVER_URL}/api/rest/project`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `bearer ${hasuraToken}`,
					// 'x-hasura-admin-secret':
					// 	process.env.HASURA_GRAPHQL_ADMIN_SECRET || '',
					'x-hasura-role': 'admin',
				},
				body: JSON.stringify(project),
			}
		)
		const data = await res.json()
		console.log('data', data)
		return NextResponse.json({ data })
	} catch (err) {
		console.log(err)
	}
}

