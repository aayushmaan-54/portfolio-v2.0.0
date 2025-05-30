import Icons from "../icons/icons";
import navLinks from "./nav-links-data";
import socialsData from "./socials-data";



const floatingDockNavbarData = {
  navigations: navLinks,
  socials: {
    github: {
      url: socialsData.find(social => social.name === 'GitHub')?.link || '',
      icon: Icons.GitHub,
    },
    linkedin: {
      url: socialsData.find(social => social.name === 'LinkedIn')?.link || '',
      icon: Icons.LinkedIn,
    },
    gmail: {
      url: socialsData.find(social => social.name === 'Gmail')?.link || '',
      icon: Icons.Gmail,
    },
  },
  extras: {
    downloadResume: {
      url: 'https://drive.google.com/file/d/1msLcDNzjsVKJMbzbIEeA6hKVoQllgnFu/view?usp=sharing',
      icon: Icons.TextFile
    }
  }
}



export default floatingDockNavbarData;
