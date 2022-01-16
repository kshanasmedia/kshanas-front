import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import stylesDoc from '../styles/Doc.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kshanas | Home</title>
        <meta name="description" content="Kshanas Media. All rights reserved." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>

          <div className={styles.core}>
                <div>
                    <h1>Page is Under construction! Click <Link href="/page/demo"><a>here</a></Link> for demo.</h1>
                </div>
          </div>

        </div>
      
      </main>
      
    </div>
  )
}
