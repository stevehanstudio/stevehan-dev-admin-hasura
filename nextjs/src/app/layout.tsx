import '../styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'SteveHan.dev Admin Panel',
  description: 'Admin Panel for SteveHan.dev.  Built with Next.js, React, Hasura, PostgreSQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<html lang='en'>
			<body>
				<ClerkProvider>
					<Header />
					<div className='flex flex-row mt-14 w-full min-h-[calc(100vh_-_56px)] overflow-y-auto'>
						<Navbar />
						{children}
					</div>
				</ClerkProvider>
			</body>
		</html>
  )
}
