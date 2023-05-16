import { useAuth } from "@clerk/nextjs"

export async function isUserAuthenticated() {
	const { getToken } = useAuth()
	try {
		const hasuraToken = await getToken()
		return true
	} catch {
		return false
	}
}
