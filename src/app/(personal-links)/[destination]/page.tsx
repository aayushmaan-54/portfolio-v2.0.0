/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use server";
import { notFound, redirect } from 'next/navigation'
import socialsData from '~/common/data/socials-data'



export default async function PersonalLinkRedirectPage({ params }: Readonly<{
  params: Promise<{ destination: string }>
}>) {
  const { destination } = await params;

  const personalLinks: Record<string, string> = {
    github: socialsData.find(social => social.name === 'GitHub')?.link!,
    linkedin: socialsData.find(social => social.name === 'LinkedIn')?.link!,
    x: socialsData.find(social => social.name === 'X/Twitter')?.link!,
    twitter: socialsData.find(social => social.name === 'X/Twitter')?.link!,
    resume: 'https://drive.google.com/file/d/1msLcDNzjsVKJMbzbIEeA6hKVoQllgnFu/view?usp=sharing',
    cv: 'https://drive.google.com/file/d/1msLcDNzjsVKJMbzbIEeA6hKVoQllgnFu/view?usp=sharing',
  }


  const url = personalLinks[destination.toLowerCase()]

  if (url) {
    redirect(url)
  } else {
    notFound()
  }
}
