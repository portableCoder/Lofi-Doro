import Head from 'next/head'

export default function SEOHead() {
    return <Head>
        <title>Lofi Doro </title>
        <meta name="og:title" content="Lofi Doro" />

        <meta name="og:description" content="A pomodoro timer to study/relax to" />
        <meta name="description" content="A pomodoro timer to study/relax to" />
        <meta name="og:image" content="https://raw.githubusercontent.com/portableCoder/Lofi-Doro/master/assets/logo.png" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>

}