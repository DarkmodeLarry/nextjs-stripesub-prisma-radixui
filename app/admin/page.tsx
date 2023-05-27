import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface PageProps {}

const AdminPage = async ({}) => {
  const session = await getServerSession(authOptions)
  console.log(session)

  if (session?.user.role !== 'ADMIN') {
    throw new Error('You aint no admin')
  }

  return (
    <div>
      <h1>This is an Admin Only Page</h1>
    </div>
  )
}

export default AdminPage
