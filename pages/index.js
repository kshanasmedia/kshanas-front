import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kshanas | Home</title>
        <meta name="description" content="Kshanas Media. All rights reserved." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.content}>
        <h3>Index</h3>
        
      </main>
      
    </div>
  )
}
