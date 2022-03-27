import Router from "next/router"
import NProgress from "nprogress"
import Head from "next/head"
import Layout from "../components/Layout"
import {ChakraProvider} from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>

      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default MyApp
