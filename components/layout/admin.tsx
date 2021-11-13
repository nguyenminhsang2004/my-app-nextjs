import { LayoutProps } from '@/models/index'
import * as React from 'react'
import { Auth } from '../common'

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>{children}</div>
    </Auth>
  )
}