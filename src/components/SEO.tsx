import Head from "next/head";
import { useRouter } from "next/router";
const defaultMeta = {
  title: "Strangers Hub",
  siteName: "strangershub.bakiwebdev.com",
  description: `Strangers Hub is an innovative website that provides a platform for people to express their thoughts and ideas anonymously. This website is a virtual space that allows individuals to share their experiences, opinions, and perspectives without the need for registration or login.

    The concept of Strangers Hub is simple yet powerful. It aims to break down the barriers that often prevent people from speaking out and sharing their ideas with the world. With this platform, users can write about anything that comes to their minds, whether it's a personal story, a social issue, a philosophical question, or a creative piece.
    
    The anonymity feature of the website is what makes it unique. It enables users to share their ideas without the fear of judgment, criticism, or backlash. By providing a safe and non-judgmental space, Strangers Hub encourages people to speak their minds freely and without inhibition.
    
    The website's interface is user-friendly and straightforward, making it easy for anyone to use. Users can simply type in their ideas, add a title, and hit submit. Once submitted, the ideas are displayed on the website for others to read and engage with.
    
    Strangers Hub is an ideal platform for those who want to express their ideas without revealing their identity. It is a place where people can share their perspectives and connect with others who may share similar thoughts or experiences. This website is not only a tool for self-expression but also a means of fostering a sense of community and understanding.`,
  url: "strangershub.bakiwebdev.com",
  type: "website",
  robots: "follow, index",
  // image:
  //   "https://res.cloudinary.com/dcmvndqd1/image/upload/v1674046971/Panda%20Steeze/WhatsApp_Image_2022-07-12_at_17.53.41-removebg-preview_uwa6vl.png",
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta["title"] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {/* <meta name="image" property="og:image" content={meta.image} /> */}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* // !STARTERCONF Remove or change to your handle */}
      {/* <meta name='twitter:site' content='@th_clarence' /> */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {/* <meta name="twitter:image" content={meta.image} /> */}
      {meta.date && (
        <>
          <meta property="article:published_time" content={meta.date} />
          <meta
            name="publish_date"
            property="og:publish_date"
            content={meta.date}
          />
          {/* // !STARTERCONF Remove or change to your name */}
          <meta
            name="author"
            property="article:author"
            content="Biruk Endris"
          />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}

// !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
// ! then replace the whole /public/favicon folder and favicon.ico
const favicons: Array<React.ComponentPropsWithoutRef<"link">> = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  { rel: "manifest", href: "/favicon/site.webmanifest" },
  {
    rel: "mask-icon",
    href: "/favicon/safari-pinned-tab.svg",
    color: "#00e887",
  },
  { rel: "shortcut icon", href: "/favicon/favicon.ico" },
];
