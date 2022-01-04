import Head from "next/head";

export default function Error404(){
    return(
        <>
        <Head>
            <title>Kshanas | Not found</title>
            <meta content="Page does not exist!"/>
        </Head>
        <main className="not__found">
            <h1>
                Oops...
            </h1>
            <p>
                This page could not be found.
            </p>
        </main>
        </>
    )
}