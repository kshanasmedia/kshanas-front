import Layout from '../components/Layout'
import '../styles/globals.css'
import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('../components/ProgressBar'), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
