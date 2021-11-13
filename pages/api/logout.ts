import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

type Data = {
  message: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Method not supported' })
  }
  const cookies = new Cookies(req, res)
  cookies.set('access_token_key')
  res.status(200).json({ message: 'Logout successfully' })
}
