'use client';
import { motion } from "motion/react"
import SocialLinksSection from "./_components/social-links-section";
import ContactForm from "./_components/contact-form";



export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-7 mb-20 px-3">
        <h1 className="text-3xl sm:text-5xl font-black mx-auto flex items-center justify-center">
          Hey, Let&apos;s Connect!{" "}
          <motion.span
            className="inline-block origin-bottom-right"
            animate={{
              rotate: [0, 14, -8, 14, -4, 10, 0],
              scale: [1, 1.1, 0.9, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            👋
          </motion.span>
        </h1>
        <h3 className="text-accent-1/40 text-xl font-black mt-1">Got anything in mind? Drop me a message.</h3>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 mb-20">
        <SocialLinksSection />
        <ContactForm />
      </div>
    </>
  );
}
