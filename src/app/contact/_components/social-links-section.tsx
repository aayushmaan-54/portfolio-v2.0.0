"use client";
import { useState } from "react";
import Link from "next/link";
import contactSocials from "~/common/data/contact-socials-data";
import socialsData from "~/common/data/socials-data";
import Icons from "~/common/icons/icons";
import toast from "react-hot-toast";



export default function SocialLinksSection() {
  const [copied, setCopied] = useState(false);

  const gmailSocial = socialsData.find(
    (social) => social.name === "Gmail" && social.gmailAddress !== undefined
  );


  const handleCopyEmail = async () => {
    if (!gmailSocial?.gmailAddress) return;
    try {
      await navigator.clipboard.writeText(gmailSocial.gmailAddress);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy email address.");
      console.error('Failed to copy email:', err);
    }
  };


  return (
    <>
      <h1 className="text-accent-1/40 text-5xl font-black my-3">Socials: </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-3">
        {contactSocials.map((contactSocial, index) => {
          const isFillOrStroke =
            contactSocial.title === "X/Twitter" || contactSocial.title === "GitHub" || contactSocial.title === "LinkedIn";

          const baseSvgColor = isFillOrStroke
            ? "fill-white size-5!"
            : "stroke-fill-white";

          const finalSvgColor =
            contactSocial.title === "Gmail" ? "size-7!" : baseSvgColor;

          const isTextInvert = contactSocial.title === "Gmail";

          return (
            <Link
              key={index}
              className={`flex items-center gap-1 p-3 rounded-lg hover:scale-105 hover:rotate-[0.5deg] transition-all duration-200 ease-in-out ${isTextInvert && "border-2 border-black/20"}`}
              title={contactSocial.title}
              href={contactSocial.link}
              target="_blank"
              style={{ backgroundColor: contactSocial.color }}
              rel="noopener noreferrer"
            >
              <contactSocial.icons className={`size-12! ${finalSvgColor}`} />
              <div className="flex flex-col justify-center ml-4 mt-1 text-white">
                <span className={`${isTextInvert ? "text-black" : ""} font-bold`}>
                  {contactSocial.title}
                </span>
                <p
                  className={`${isTextInvert ? "text-black/70" : "text-white/70"
                    } text-sm flex items-center justify-center gap-2`}
                >
                  {contactSocial.username}
                  <Icons.ArrowUpRight className="size-4" />
                </p>
              </div>
            </Link>
          );
        })}

        {gmailSocial && (
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 p-3 rounded-lg hover:scale-105 hover:rotate-[0.5deg] transition-all duration-200 ease-in-out bg-primary-2 border-0 cursor-pointer text-left w-full"
            title="Copy Gmail Address"
          >
            <div className="relative">
              <Icons.Copy
                className={`size-12! stroke-accent-3 transition-all duration-300 ease-in-out ${copied ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  }`}
              />

              <Icons.Check
                className={`size-12! stroke-green-500 absolute top-0 left-0 transition-all duration-300 ease-in-out ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
              />
            </div>

            <div className="flex flex-col justify-center ml-4 mt-1">
              <span className="font-bold text-accent-3">
                {copied ? 'Copied!' : 'Copy Email'}
              </span>
              <p className="text-accent-3/70 text-sm flex items-center gap-2">
                {gmailSocial.gmailAddress}
                {!copied && <Icons.ArrowUpRight className="size-4" />}
              </p>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
