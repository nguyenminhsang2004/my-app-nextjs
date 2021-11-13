import { authApi } from '@/api/index'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 24 * 60 * 60 * 1000, /// 24hr
    revalidateOnFocus: false,
    ...options,
  })
  
  const firstLoading = profile === undefined && error === undefined

  async function login() {
    await authApi.login({
      email: 'sangnm.it@gmail.com',
      password: '74423245',
    })
    await mutate()
  }

  async function logout() {
    await authApi.logout()
    await mutate(null, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading
  }
}
