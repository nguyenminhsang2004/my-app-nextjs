import axiosClient from '@/api/axios-client'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models/common'
import { createEmotionCache, theme } from '@/utils/index'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SWRConfig } from 'swr'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
