import { Card, CardContent } from '@mui/material'
import React from 'react'

export interface PostCardProps {}

export function PostCard(props: PostCardProps) {
  return (
    <Card>
      <CardContent>Post title</CardContent>
    </Card>
  )
}
