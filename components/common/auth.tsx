import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

export interface AuthProps {
  children: any
}

export function Auth({ children }: AuthProps) {
  const router = useRouter()
  const {profile, firstLoading} = useAuth()
  useEffect(() => {
    if(!firstLoading && !profile?.email) router.push('/login')
  }, [firstLoading, profile, router])

  if(!profile?.email) return <p>Loading...</p>

  return <div>{children}</div>
}
