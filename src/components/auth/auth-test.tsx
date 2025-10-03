'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export function AuthTest() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading session...</div>
  }

  return (
    <div className="p-4 border rounded-lg bg-muted">
      <h3 className="font-semibold mb-2">Auth Debug Info:</h3>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Session:</strong> {session ? 'Yes' : 'No'}</p>
      {session && (
        <>
          <p><strong>User:</strong> {session.user?.name || 'No name'}</p>
          <p><strong>Email:</strong> {session.user?.email || 'No email'}</p>
          <p><strong>Image:</strong> {session.user?.image ? 'Yes' : 'No'}</p>
        </>
      )}
      <div className="mt-4 space-x-2">
        {session ? (
          <button 
            onClick={() => signOut()} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}
