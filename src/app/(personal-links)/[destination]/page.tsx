/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use server";
import { notFound, redirect } from 'next/navigation'
import floatingDockNavbarData from '~/common/data/floating-dock-navbar-data';
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
    instagram: 'https://www.instagram.com/aayushmaan.soni/#',
    insta: 'https://www.instagram.com/aayushmaan.soni/#',
    resume: floatingDockNavbarData.extras.downloadResume.url,
    cv: floatingDockNavbarData.extras.downloadResume.url,
    peerlist: 'https://peerlist.io/aayushmaansoni',
  }


  const url = personalLinks[destination.toLowerCase()]

  if (url) {
    redirect(url)
  } else {
    notFound()
  }
}
