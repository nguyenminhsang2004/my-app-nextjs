import httpProxy, { ProxyResCallback } from 'http-proxy'
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

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Method not supported' })
  }
  return new Promise((resolve) => {
    req.headers.cookie = ''
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = ''
      proxyRes.on('data', (chunk) => {
        body += chunk
      })
      proxyRes.on('end', () => {
        try {
          const { accessToken, message } = JSON.parse(body)
          // convert token to cookie
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
          cookies.set('access_token_key', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
          })
          ;(res as NextApiResponse).status(200).json({ message })
        } catch (error) {
          ;(res as NextApiResponse).status(500).json({ message: 'Internal server error' })
        }
      })

      resolve(true)
    }
    proxy.once('proxyRes', handleLoginResponse)
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    })
  })
}
