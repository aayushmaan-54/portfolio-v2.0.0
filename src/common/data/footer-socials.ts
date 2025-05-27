import Icons from "~/common/icons/icons";
import socialsData from "./socials-data";



const footerSocials = [
  {
    title: 'GitHub',
    link: socialsData.find(social => social.name === 'GitHub')?.link || '',
    icons: Icons.GitHubMinimal,
  },
  {
    title: 'LinkedIn',
    link: socialsData.find(social => social.name === 'LinkedIn')?.link || '',
    icons: Icons.LinkedInMinimal,
  },
  {
    title: 'X/Twitter',
    link: socialsData.find(social => social.name === 'X/Twitter')?.link || '',
    icons: Icons.X_Twitter,
  },
  {
    title: 'Gmail',
    link: socialsData.find(social => social.name === 'Gmail')?.link || '',
    icons: Icons.Envelope,
    gmailAddress: socialsData.find(social => social.name === 'Gmail')?.gmailAddress || '',
  }
]



export default footerSocials;
