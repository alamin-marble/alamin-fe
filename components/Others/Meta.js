import Head from "next/head";

export default function Meta({ MetaData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    headline: !!MetaData && MetaData.data[0].metaTitle
      ? MetaData.data[0].metaTitle
      : "Al Amin marble company",

    description: !!MetaData && MetaData.data[0].metaDescription ? MetaData.data[0].metaDescription
      : "Al-Amin is a leading company in the manufacture and trade of marble and granite, serving all the palaces and in the Kingdom of Saudi Arabia",

    author: [
      {
        '@type': 'Person',
        name: 'سعد الأمين',
      },
    ],
    datePublished: '2022-09-14T09:00:00.000Z',
  };

  return (
    <>
      <Head>
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `
          }}
        />
        <title>
          {!!MetaData && MetaData.data[0].metaTitle
            ? MetaData.data[0].metaTitle
            : "Al Amin marble company"}
        </title>
        <meta
          name="description"
          content={
            !!MetaData && MetaData.data[0].metaDescription
              ?    MetaData.data[0].metaDescription
              : "Al-Amin is a leading company in the manufacture and trade of marble and granite, serving all the palaces and in the Kingdom of Saudi Arabia"
          }
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script>{`!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '3719591024929495');
                fbq('track', 'PageView');`}</script>
                <noscript><img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=3719591024929495&ev=PageView&noscript=1"
                /></noscript>
      </Head>
    </>
  );
}
