import { LayoutProps } from '@/models/index'
import * as React from 'react'
import { Auth } from '../common'

export function MailLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <h1>Main Layout</h1>
      <div>{children}</div>
    </Auth>
  )
}
