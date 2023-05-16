// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!')
// }

import { NextResponse } from 'next/server'

export async function GET({ params }: {params: { id: string }}) {
	const { id } = params
  console.log(
		`GetProjectById fetching from: ${process.env.HASURA_SERVER_URL}/api/rest/project/${id}`
  )

	// const res = await fetch(`http://localhost:8080/api/rest/project/${id}`)
	const res = await fetch(`${process.env.HASURA_SERVER_URL}/api/rest/project/${id}`)

	const data = await res.json()
  console.log('GetProjectById data:', data)

	return NextResponse.json({ data })
}