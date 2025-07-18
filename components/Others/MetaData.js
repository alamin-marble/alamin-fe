import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
export default function MetaData(props) {
  const { asPath } = useRouter();
  const origin =
      typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : '';
  const currentUrl = `${origin}${asPath}`;
 
  let title = props.title ? props.title : "Al Amin marble company";
  let image = props.image
    ? props.image
    : `${process.env.SERVER_LINK}/public/assets/static/logo.png`;
  let description = props.description
    ? props.description
    : "Al-Amin is a leading company in the manufacture and trade of marble and granite, serving all the palaces and in the Kingdom of Saudi Arabia";
  
    return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noodp" />

      {/* OG meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="450" />
      <meta property="og:image:height" content="298" />
      <meta property="og:site_name" content="Alamin" />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
