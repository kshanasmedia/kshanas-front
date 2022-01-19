import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import stylesDoc from '../styles/Doc.module.css'
import Link from 'next/link';
import logoSvg from '../public/kshanas_gold.svg';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kshanas | Home</title>
        <meta name="description" content="Kshanas Media. All rights reserved." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>

          <div className={styles.core}>
                <div>
                    <div className={styles.logohome}>
                      <Image src={logoSvg} height={150}/>
                      <div className={styles.logotext}>KshanasMedia</div>
                    </div>
                    <p className={styles.content}>
                    Page is Under construction! Click <Link href="/page/demo"><a>here</a></Link> for demo.
                    </p>
                </div>
          </div>

        </div>
      
      </main>
      
    </div>
  )
}
