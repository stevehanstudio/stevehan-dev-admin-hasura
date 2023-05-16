import { NextResponse } from 'next/server'

export async function GET() {
  console.log(`GetProjects`);

	// const res = await fetch('http://localhost:8080/api/rest/projects')
	const res = await fetch(`${process.env.HASURA_SERVER_URL}/api/rest/projects`)

	const data = await res.json()
  console.log('data', data)

	return NextResponse.json({ data })
}