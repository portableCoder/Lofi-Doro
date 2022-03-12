import Head from 'next/head'

export default function SEOHead() {
    return <Head>
        <title>Lofi Doro </title>
        <meta name="og:description" content="A pomodoro timer to study/relax to" />
        <meta name="description" content="A pomodoro timer to study/relax to" />
        <meta name="og:image" content="A pomodoro timer to study/relax to" />

        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
    </Head>

}