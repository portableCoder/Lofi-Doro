import Head from 'next/head'

export default function SEOHead() {
    return <Head>
        <title>Lofi Doro </title>
        <meta property="og:title" content="Lofi Doro" />
        <meta property="og:image" content="https://raw.githubusercontent.com/portableCoder/Lofi-Doro/master/assets/logo.png" />
        <meta property="og:description" content="A pomodoro timer to study/relax to" />
        <meta name="description" content="A pomodoro timer to study/relax to" />

        <link rel="shortcut icon" href="/Lofi-Doro/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Lofi-Doro/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Lofi-Doro/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Lofi-Doro/favicon-16x16.png" />
    </Head>

}