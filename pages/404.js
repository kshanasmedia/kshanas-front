import Head from "next/head";

export default function Error404({children}){
    return(
        <>
        <Head>
            <title>Kshanas | Not found</title>
            <meta content="Page does not exist!"/>
        </Head>
        <main>
            <div className="not__found">
            <h1>
                Unfortunately...
            </h1>
            <p>
                This page could not be found.
            </p>
            {children}
            </div>
        </main>
        </>
    )
}