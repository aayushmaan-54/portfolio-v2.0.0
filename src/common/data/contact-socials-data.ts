import Icons from "../icons/icons";
import socialsData from "./socials-data";



const contactSocials = [
  {
    title: 'GitHub',
    link: socialsData.find(social => social.name === 'GitHub')?.link || '',
    icons: Icons.GitHub,
    color: '#18181B',
    username: 'aayushmaan-54'
  },
  {
    title: 'LinkedIn',
    link: socialsData.find(social => social.name === 'LinkedIn')?.link || '',
    icons: Icons.LinkedIn,
    color: '#0A66C2',
    username: 'aayushmaan54'
  },
  {
    title: 'X/Twitter',
    link: socialsData.find(social => social.name === 'X/Twitter')?.link || '',
    icons: Icons.X_Twitter,
    color: '#18181B',
    username: '@aayushmaan54'
  },
  {
    title: 'Gmail',
    link: socialsData.find(social => social.name === 'Gmail')?.link || '',
    icons: Icons.GmailColored,
    gmailAddress: socialsData.find(social => social.name === 'Gmail')?.gmailAddress || '',
    color: '#FFFFFF',
    username: 'aayushmaan.soni54@gmail.com'
  }
]



export default contactSocials;
