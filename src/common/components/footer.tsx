import Link from "next/link";
import navLinks from "~/common/data/nav-links-data";
import footerSocials from "../data/footer-socials";
import getCurrentYear from "../utils/get-current-year";



export default function Footer() {
  return (
    <>
      <footer className="w-full mt-auto py-4 pt-7 pb-32 flex flex-col items-center justify-center text-xs sm:text-sm font-bold border-t border-accent-1/20">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          {navLinks.map((link, index) => (
            <Link
              className="underline decoration-2 decoration-accent-1/40 text-accent-3/90 hover:text-accent-3 hover:decoration-accent-1 transition-all duration-200"
              href={link.url}
              key={index}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-4">
          {footerSocials.map((social, index) => {
            const finalSvgColor = social.title === "X/Twitter" ? "fill-accent-3/40 hover:fill-accent-3 size-5! transition-colors duration-200" : "stroke-accent-3/40 hover:stroke-accent-3 transition-colors duration-200";

            return (
              <Link
                className="flex items-center gap-1 underline decoration-2 decoration-accent-1/40 text-accent-3/90 hover:text-accent-3 hover:decoration-accent-1 transition-all duration-200"
                title={social.title}
                href={social.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icons className={`size-5.5 ${finalSvgColor}`} />
              </Link>
            )
          })}
        </div>
        <span className="text-accent-3/60 text-xs font-medium">&copy; {getCurrentYear()} Aayushmaan Soni</span>
      </footer>
    </>
  );
}
