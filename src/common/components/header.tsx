import Link from "next/link";
import Icons from "~/common/icons/icons";
import ThemeToggle from "~/common/components/theme-toggle";
import socialsData from "../data/socials-data";


export default function Header() {
  return (
    <>
      <header className="pt-6 pb-10 px-4 sm:px-6">
        <nav className="flex items-center justify-between mx-auto max-w-7xl">
          <Link
            href={socialsData.find(social => social.name === 'Gmail')?.link || ''} className="flex items-center justify-center relative"
            target="_blank"
          >
            <Icons.Envelope className="stroke-accent-3" />
            <span>
              {socialsData.find(social => social.name === 'Gmail')?.gmailAddress || ""}
            </span>
            <Icons.ScribbleCircle className="absolute w-70 stroke-accent-3/60" />
          </Link>

          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
