import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Catarina Osório de Castro</title>
      <meta name="description" content="Catarina Osório de Castro - Fotografia" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
